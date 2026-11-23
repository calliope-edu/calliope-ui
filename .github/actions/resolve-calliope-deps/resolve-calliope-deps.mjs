#!/usr/bin/env node
// Points the Calliope packages in an app's package.json at the state the build's channel asks
// for: on `dev` the newest commit on `calliope-main`, on `live` the newest release tag `vX.Y.Z`
// within the major version the app pins. Only git dependencies on GitHub are touched; the app
// installs afterwards (its lockfile is then out of date on purpose).
//
//   node resolve-calliope-deps.mjs --channel dev|live|auto [--package-json package.json]
//        [--packages "@calliope-edu/ui @calliope-edu/mini-connection-widget"]
//        [--branch calliope-main] [--dry-run]
//
// Prints the resolved states as JSON on stdout (`{ "ui": { "tag", "commit" }, "widget": … }`,
// the shape of `ui` and `widget` in BUILD.json) and, inside GitHub Actions, writes them to the
// step outputs and the job summary. Docs: README.md beside this file.

import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { newestReleaseTag, parseVersion } from './semver.mjs';

export const DEFAULT_PACKAGES = ['@calliope-edu/ui', '@calliope-edu/mini-connection-widget'];
export const DEFAULT_BRANCH = 'calliope-main';

/** Short keys used in BUILD.json and the step outputs. */
const KEYS = { '@calliope-edu/ui': 'ui', '@calliope-edu/mini-connection-widget': 'widget' };

/** @param {string} name */
export function keyOf(name) {
	return KEYS[/** @type {keyof typeof KEYS} */ (name)] ?? name.replace(/^@[^/]+\//, '');
}

const GITHUB_SPEC =
	/^(github:|git\+https:\/\/github\.com\/|https:\/\/github\.com\/|git\+ssh:\/\/git@github\.com[:/]|git@github\.com:)?([\w.-]+)\/([\w.-]+?)(\.git)?(?:#(.*))?$/;

/**
 * @typedef {{ prefix: string, owner: string, repo: string, dotGit: string, ref: string }} GithubSpec
 */

/**
 * Splits a GitHub dependency spec (`github:owner/repo#ref`, `git+https://github.com/…`,
 * `owner/repo#ref`, …) into its parts, or returns null for anything else.
 * @param {string} spec
 * @returns {GithubSpec | null}
 */
export function parseGithubSpec(spec) {
	const m = GITHUB_SPEC.exec(spec.trim());
	if (!m) return null;
	return { prefix: m[1] ?? '', owner: m[2], repo: m[3], dotGit: m[4] ?? '', ref: m[5] ?? '' };
}

/**
 * The same spec pointing at another ref, in the app's own notation.
 * @param {GithubSpec} spec
 * @param {string} ref
 */
export function withRef(spec, ref) {
	return `${spec.prefix}${spec.owner}/${spec.repo}${spec.dotGit}#${ref}`;
}

/**
 * The major version an app pins: from a tag (`v1.2.3`) or a range (`semver:^1.2.0`) directly,
 * otherwise (a commit or a branch) from `version` in the package's package.json at that ref.
 * @param {GithubSpec} spec
 * @param {Remote} remote
 */
export async function pinnedMajor(spec, remote) {
	const range = /^semver:\D*(\d+)/.exec(spec.ref);
	if (range) return Number(range[1]);
	const tag = parseVersion(spec.ref);
	if (tag) return tag[0];
	const version = await remote.packageVersion(spec.owner, spec.repo, spec.ref);
	const parsed = parseVersion(version);
	if (!parsed) {
		throw new Error(
			`${spec.owner}/${spec.repo}@${spec.ref || 'HEAD'} has version "${version}", not X.Y.Z`
		);
	}
	return parsed[0];
}

/**
 * @typedef {{
 *   lsRemote(owner: string, repo: string, args: string[]): Promise<Array<[string, string]>>,
 *   packageVersion(owner: string, repo: string, ref: string): Promise<string>
 * }} Remote
 */

/**
 * @typedef {{
 *   name: string, key: string, repo: string, from: string, to: string,
 *   tag: string | null, commit: string, major: number | null
 * }} Resolved
 */

/**
 * Resolves one dependency for a channel.
 * @param {{ name: string, spec: string, channel: 'dev' | 'live', branch: string, remote: Remote }} options
 * @returns {Promise<Resolved>}
 */
export async function resolveDependency({ name, spec, channel, branch, remote }) {
	const parsed = parseGithubSpec(spec);
	if (!parsed) throw new Error(`${name}: "${spec}" is not a GitHub dependency`);
	const repo = `${parsed.owner}/${parsed.repo}`;
	const base = { name, key: keyOf(name), repo, from: spec };

	if (channel === 'dev') {
		const refs = await remote.lsRemote(parsed.owner, parsed.repo, [`refs/heads/${branch}`]);
		const head = refs.find(([, ref]) => ref === `refs/heads/${branch}`);
		if (!head) throw new Error(`${name}: ${repo} has no branch ${branch}`);
		return { ...base, to: withRef(parsed, head[0]), tag: null, commit: head[0], major: null };
	}

	const major = await pinnedMajor(parsed, remote);
	const refs = await remote.lsRemote(parsed.owner, parsed.repo, ['--tags']);
	/** @type {Map<string, string>} tag name → commit (annotated tags: the peeled commit) */
	const commits = new Map();
	for (const [sha, ref] of refs) {
		if (!ref.startsWith('refs/tags/')) continue;
		const peeled = ref.endsWith('^{}');
		const tagName = ref.slice('refs/tags/'.length, peeled ? -3 : undefined);
		if (peeled || !commits.has(tagName)) commits.set(tagName, sha);
	}
	const tag = newestReleaseTag([...commits.keys()], major);
	if (!tag) throw new Error(`${name}: ${repo} has no release tag v${major}.x.y`);
	return {
		...base,
		to: withRef(parsed, tag),
		tag,
		commit: /** @type {string} */ (commits.get(tag)),
		major
	};
}

/**
 * Replaces the spec of `name` in the package.json text, keeping its formatting.
 * @param {string} text
 * @param {string} name
 * @param {string} from
 * @param {string} to
 */
export function replaceSpec(text, name, from, to) {
	const escape = (/** @type {string} */ s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const pattern = new RegExp(
		`(${escape(JSON.stringify(name))}\\s*:\\s*)${escape(JSON.stringify(from))}`,
		'g'
	);
	return text.replace(pattern, (_, key) => key + JSON.stringify(to));
}

const SECTIONS = ['dependencies', 'devDependencies', 'optionalDependencies'];

/**
 * Resolves every listed package the app depends on and returns the new package.json text and
 * the BUILD.json fragment (`{ ui: { tag, commit } | null, widget: … }`).
 * @param {{ text: string, packages: string[], channel: 'dev' | 'live', branch: string, remote: Remote, log?: (line: string) => void }} options
 */
export async function resolveAll({ text, packages, channel, branch, remote, log = () => {} }) {
	const pkg = JSON.parse(text);
	/** @type {Record<string, { tag: string | null, commit: string } | null>} */
	const build = {};
	/** @type {Resolved[]} */
	const resolved = [];
	for (const name of packages) {
		build[keyOf(name)] = null;
		const section = SECTIONS.find((s) => pkg[s]?.[name] !== undefined);
		if (!section) {
			log(`${name}: not a dependency, skipped`);
			continue;
		}
		const spec = pkg[section][name];
		if (!parseGithubSpec(spec)) {
			log(`${name}: "${spec}" is not a GitHub dependency, left as it is`);
			continue;
		}
		const result = await resolveDependency({ name, spec, channel, branch, remote });
		text = replaceSpec(text, name, result.from, result.to);
		build[result.key] = { tag: result.tag, commit: result.commit };
		resolved.push(result);
		log(`${name}: ${result.from} -> ${result.to} (${result.commit})`);
	}
	return { text, build, resolved };
}

/**
 * The real remote: `git ls-remote` for refs, the GitHub API for package.json at a ref.
 * @param {string | undefined} token used for the GitHub API only (rate limit)
 * @returns {Remote}
 */
export function githubRemote(token) {
	return {
		async lsRemote(owner, repo, args) {
			// `git ls-remote [options] <url> [patterns]`
			const options = args.filter((a) => a.startsWith('-'));
			const patterns = args.filter((a) => !a.startsWith('-'));
			const url = `https://github.com/${owner}/${repo}.git`;
			const out = execFileSync('git', ['ls-remote', ...options, url, ...patterns], {
				encoding: 'utf8',
				env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }
			});
			return out
				.split('\n')
				.filter(Boolean)
				.map((line) => /** @type {[string, string]} */ (line.split('\t')));
		},
		async packageVersion(owner, repo, ref) {
			const query = ref ? `?ref=${encodeURIComponent(ref)}` : '';
			const url = `https://api.github.com/repos/${owner}/${repo}/contents/package.json${query}`;
			/** @type {Record<string, string>} */
			const headers = {
				Accept: 'application/vnd.github.raw+json',
				'User-Agent': 'resolve-calliope-deps',
				'X-GitHub-Api-Version': '2022-11-28'
			};
			if (token) headers.Authorization = `Bearer ${token}`;
			const res = await fetch(url, { headers });
			if (!res.ok) throw new Error(`GET ${url}: ${res.status} ${res.statusText}`);
			return JSON.parse(await res.text()).version ?? '';
		}
	};
}

/**
 * `auto` is `live` when the workflow runs for a tag, else `dev`.
 * @param {string} channel
 * @param {NodeJS.ProcessEnv} env
 * @returns {'dev' | 'live'}
 */
export function channelOf(channel, env) {
	if (channel === 'dev' || channel === 'live') return channel;
	if (channel === 'auto') {
		if (!env.GITHUB_REF) throw new Error('--channel auto works inside GitHub Actions only');
		return env.GITHUB_REF.startsWith('refs/tags/') ? 'live' : 'dev';
	}
	throw new Error(`Unknown channel "${channel}": use dev, live or auto`);
}

/** @param {string[]} argv */
async function main(argv) {
	const { values } = parseArgs({
		args: argv,
		options: {
			channel: { type: 'string', default: 'auto' },
			'package-json': { type: 'string', default: 'package.json' },
			packages: { type: 'string', default: DEFAULT_PACKAGES.join(' ') },
			branch: { type: 'string', default: DEFAULT_BRANCH },
			'dry-run': { type: 'boolean', default: false }
		}
	});
	const env = process.env;
	const channel = channelOf(/** @type {string} */ (values.channel), env);
	const file = /** @type {string} */ (values['package-json']);
	const packages = /** @type {string} */ (values.packages).split(/[\s,]+/).filter(Boolean);
	const log = (/** @type {string} */ line) => console.error(line);

	log(`Channel: ${channel}`);
	const { text, build, resolved } = await resolveAll({
		text: readFileSync(file, 'utf8'),
		packages,
		channel,
		branch: /** @type {string} */ (values.branch),
		remote: githubRemote(env.GITHUB_TOKEN || env.GH_TOKEN),
		log
	});
	if (values['dry-run']) log(`Dry run: ${file} left as it is`);
	else writeFileSync(file, text);

	const json = JSON.stringify(build);
	console.log(json);

	if (env.GITHUB_OUTPUT) {
		const lines = [`channel=${channel}`, `json=${json}`];
		for (const [key, state] of Object.entries(build)) {
			lines.push(`${key}-tag=${state?.tag ?? ''}`, `${key}-commit=${state?.commit ?? ''}`);
		}
		appendFileSync(env.GITHUB_OUTPUT, lines.join('\n') + '\n');
	}
	if (env.GITHUB_STEP_SUMMARY) {
		const rows = resolved.map(
			(r) => `| \`${r.name}\` | \`${r.from}\` | ${r.tag ?? '–'} | \`${r.commit.slice(0, 7)}\` |`
		);
		appendFileSync(
			env.GITHUB_STEP_SUMMARY,
			[
				`### Calliope dependencies (${channel})`,
				'',
				'| Package | Pinned | Tag | Commit |',
				'| --- | --- | --- | --- |',
				...rows,
				''
			].join('\n') + '\n'
		);
	}
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
	main(process.argv.slice(2)).catch((error) => {
		console.error(process.env.GITHUB_ACTIONS ? `::error::${error.message}` : error.message);
		process.exit(1);
	});
}
