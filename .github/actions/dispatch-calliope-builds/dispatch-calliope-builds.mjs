#!/usr/bin/env node
// Starts the build workflows of every app that builds with calliope-ui and the connection
// widget (builds.json beside this file), so a new commit or release of either reaches the
// apps without a commit of their own:
//
//   dev   the app's dev build: its workflow on its dev branch (`calliope-main`; Campus `main`),
//         which takes the newest commits of calliope-ui and the widget
//   live  the app's live build: its workflow on its newest release tag, which takes the newest
//         release tags of calliope-ui and the widget
//
// Each build is started with `workflow_dispatch` on that ref, so it runs exactly as a push of
// the branch or the tag would (`github.ref_type` is `branch` or `tag`).
//
//   node dispatch-calliope-builds.mjs --channels "dev live" [--builds builds.json] [--dry-run]
//
// Needs GITHUB_TOKEN (or GH_TOKEN) with `actions: write` on the apps' repositories, except with
// --dry-run, which only prints what it would start. Docs: README.md beside this file.

import { appendFileSync, readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { compareVersions, parseVersion } from '../resolve-calliope-deps/semver.mjs';

export const CHANNELS = /** @type {const} */ (['dev', 'live']);

/**
 * @typedef {{
 *   repo: string,
 *   workflow: string,
 *   dev?: { ref: string, inputs?: Record<string, string> },
 *   live?: { tagPrefix: string, inputs?: Record<string, string> }
 * }} Build
 */

/**
 * @typedef {{
 *   repo: string, workflow: string, channel: 'dev' | 'live',
 *   ref: string, inputs: Record<string, string>
 * }} Dispatch
 */

/**
 * @typedef {{
 *   tags(repo: string, prefix: string): Promise<string[]>,
 *   dispatch(repo: string, workflow: string, ref: string, inputs: Record<string, string>): Promise<void>
 * }} Api
 */

/**
 * The channels named in `text` (`dev`, `live`, `dev live`, `dev,live`), in their fixed order.
 * @param {string} text
 * @returns {Array<'dev' | 'live'>}
 */
export function parseChannels(text) {
	const words = text.split(/[\s,]+/).filter(Boolean);
	for (const word of words) {
		if (!CHANNELS.includes(/** @type {'dev' | 'live'} */ (word))) {
			throw new Error(`Unknown channel "${word}": use dev, live or both`);
		}
	}
	if (!words.length) throw new Error('No channel given: use dev, live or both');
	return CHANNELS.filter((c) => words.includes(c));
}

/**
 * The newest release tag `<prefix>X.Y.Z` among `tags` (no pre-releases), or null.
 * @param {string[]} tags
 * @param {string} prefix `v` for our own repos, `calliope-v` for forks
 * @returns {string | null}
 */
export function newestTag(tags, prefix) {
	/** @type {{ tag: string, version: [number, number, number] } | null} */
	let best = null;
	for (const tag of tags) {
		if (!tag.startsWith(prefix)) continue;
		const version = parseVersion(tag.slice(prefix.length));
		// parseVersion also takes a leading `v`; `vv1.0.0` is no release tag.
		if (!version || tag.slice(prefix.length).startsWith('v')) continue;
		if (!best || compareVersions(version, best.version) > 0) best = { tag, version };
	}
	return best ? best.tag : null;
}

/**
 * Which workflow runs to start: per build and channel, the ref and inputs. A build without the
 * channel is left out; a live build without a release tag fails (as an error in the result).
 * @param {{ builds: Build[], channels: Array<'dev' | 'live'>, api: Pick<Api, 'tags'> }} options
 * @returns {Promise<{ dispatches: Dispatch[], errors: string[] }>}
 */
export async function planDispatches({ builds, channels, api }) {
	/** @type {Dispatch[]} */
	const dispatches = [];
	/** @type {string[]} */
	const errors = [];
	for (const channel of channels) {
		for (const build of builds) {
			const base = { repo: build.repo, workflow: build.workflow, channel };
			if (channel === 'dev' && build.dev) {
				dispatches.push({ ...base, ref: build.dev.ref, inputs: build.dev.inputs ?? {} });
			}
			if (channel === 'live' && build.live) {
				const { tagPrefix } = build.live;
				try {
					const tag = newestTag(await api.tags(build.repo, tagPrefix), tagPrefix);
					if (!tag) throw new Error(`no release tag ${tagPrefix}X.Y.Z`);
					dispatches.push({ ...base, ref: tag, inputs: build.live.inputs ?? {} });
				} catch (error) {
					errors.push(`${build.repo} (live): ${/** @type {Error} */ (error).message}`);
				}
			}
		}
	}
	return { dispatches, errors };
}

/**
 * Starts every planned run. One failing run does not stop the others.
 * @param {{ dispatches: Dispatch[], api: Pick<Api, 'dispatch'>, log?: (line: string) => void }} options
 * @returns {Promise<{ started: Dispatch[], errors: string[] }>}
 */
export async function dispatchAll({ dispatches, api, log = () => {} }) {
	/** @type {Dispatch[]} */
	const started = [];
	/** @type {string[]} */
	const errors = [];
	for (const d of dispatches) {
		try {
			await api.dispatch(d.repo, d.workflow, d.ref, d.inputs);
			started.push(d);
			log(`${d.channel}: started ${d.repo} ${d.workflow} on ${d.ref}`);
		} catch (error) {
			errors.push(`${d.repo} (${d.channel}): ${/** @type {Error} */ (error).message}`);
		}
	}
	return { started, errors };
}

/**
 * The GitHub REST API. Without a token only reading public repositories works.
 * @param {string | undefined} token
 * @returns {Api}
 */
export function githubApi(token) {
	/** @param {string} path @param {RequestInit} [init] */
	async function request(path, init = {}) {
		const response = await fetch(`https://api.github.com${path}`, {
			...init,
			headers: {
				accept: 'application/vnd.github+json',
				'x-github-api-version': '2022-11-28',
				...(token ? { authorization: `Bearer ${token}` } : {}),
				...init.headers
			}
		});
		if (!response.ok) {
			const body = await response.text();
			throw new Error(`${init.method ?? 'GET'} ${path}: ${response.status} ${body.slice(0, 200)}`);
		}
		return response;
	}
	return {
		async tags(repo, prefix) {
			const response = await request(
				`/repos/${repo}/git/matching-refs/tags/${encodeURIComponent(prefix)}?per_page=100`
			);
			/** @type {Array<{ ref: string }>} */
			const refs = await response.json();
			return refs.map((r) => r.ref.replace(/^refs\/tags\//, ''));
		},
		async dispatch(repo, workflow, ref, inputs) {
			await request(`/repos/${repo}/actions/workflows/${encodeURIComponent(workflow)}/dispatches`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ ref, inputs })
			});
		}
	};
}

/** @param {string[]} argv */
export async function main(argv) {
	const { values } = parseArgs({
		args: argv,
		options: {
			channels: { type: 'string', default: 'dev' },
			builds: {
				type: 'string',
				default: fileURLToPath(new URL('./builds.json', import.meta.url))
			},
			'dry-run': { type: 'boolean', default: false }
		}
	});
	const env = process.env;
	const log = (/** @type {string} */ line) => console.error(line);
	const dryRun = /** @type {boolean} */ (values['dry-run']);
	const token = env.GITHUB_TOKEN || env.GH_TOKEN;
	if (!dryRun && !token) throw new Error('GITHUB_TOKEN or GH_TOKEN is needed (or --dry-run)');

	const channels = parseChannels(/** @type {string} */ (values.channels));
	/** @type {{ builds: Build[] }} */
	const { builds } = JSON.parse(readFileSync(/** @type {string} */ (values.builds), 'utf8'));
	const api = githubApi(token);

	const planned = await planDispatches({ builds, channels, api });
	/** @type {{ started: Dispatch[], errors: string[] }} */
	let done = { started: [], errors: [] };
	if (dryRun) {
		for (const d of planned.dispatches) {
			log(`${d.channel}: would start ${d.repo} ${d.workflow} on ${d.ref}`);
		}
	} else {
		done = await dispatchAll({ dispatches: planned.dispatches, api, log });
	}
	const errors = [...planned.errors, ...done.errors];
	for (const error of errors) log(env.GITHUB_ACTIONS ? `::error::${error}` : `Failed: ${error}`);

	if (env.GITHUB_STEP_SUMMARY) {
		const state = (/** @type {Dispatch} */ d) =>
			dryRun ? 'not started (dry run)' : done.started.includes(d) ? 'started' : 'failed';
		const rows = planned.dispatches.map(
			(d) =>
				`| ${d.channel} | [${d.repo}](https://github.com/${d.repo}/actions/workflows/${d.workflow}) | \`${d.ref}\` | ${state(d)} |`
		);
		appendFileSync(
			env.GITHUB_STEP_SUMMARY,
			[
				`### Builds (${channels.join(' + ')})`,
				'',
				'| Channel | App | Ref | |',
				'| --- | --- | --- | --- |',
				...rows,
				...errors.map((e) => `\n- ${e}`),
				''
			].join('\n') + '\n'
		);
	}
	if (errors.length) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
	main(process.argv.slice(2)).catch((error) => {
		console.error(process.env.GITHUB_ACTIONS ? `::error::${error.message}` : error.message);
		process.exit(1);
	});
}
