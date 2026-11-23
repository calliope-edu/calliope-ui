// Release versions (scripts/release-version.mjs) and the channel resolution of the shared
// action (.github/actions/resolve-calliope-deps), without network: the remote is faked.
import { describe, expect, it } from 'vitest';
import { nextVersion, setPackageVersion } from './release-version.mjs';
import {
	channelOf,
	parseGithubSpec,
	replaceSpec,
	resolveAll,
	withRef
} from '../.github/actions/resolve-calliope-deps/resolve-calliope-deps.mjs';
import { newestReleaseTag } from '../.github/actions/resolve-calliope-deps/semver.mjs';

describe('release versions', () => {
	it('starts from package.json without tags', () => {
		expect(nextVersion({ packageVersion: '0.0.1', tags: [], bump: 'minor' })).toBe('0.1.0');
	});

	it('starts from the newest tag when it is higher than package.json', () => {
		const tags = ['v0.1.0', 'v0.10.0', 'v0.9.3', 'calliope-v2.0.0'];
		expect(nextVersion({ packageVersion: '0.1.0', tags, bump: 'patch' })).toBe('0.10.1');
		expect(nextVersion({ packageVersion: '0.1.0', tags, bump: 'major' })).toBe('1.0.0');
	});

	it('takes an explicit version only when it is higher', () => {
		expect(nextVersion({ packageVersion: '0.2.0', tags: [], bump: '0.2.5' })).toBe('0.2.5');
		expect(() => nextVersion({ packageVersion: '0.2.0', tags: [], bump: '0.2.0' })).toThrow();
		expect(() => nextVersion({ packageVersion: '0.2.0', tags: [], bump: 'huge' })).toThrow();
	});

	it('sets the top-level version and keeps the formatting', () => {
		const text = '{\n\t"name": "x",\n\t"version": "0.0.1",\n\t"dependencies": {}\n}\n';
		expect(setPackageVersion(text, '0.1.0')).toBe(text.replace('0.0.1', '0.1.0'));
	});
});

describe('release tags', () => {
	it('picks the newest vX.Y.Z, optionally within a major', () => {
		const tags = ['v0.9.0', 'v0.10.2', 'v1.0.0', 'v1.1.0-beta.1', 'calliope-v3.0.0', 'latest'];
		expect(newestReleaseTag(tags)).toBe('v1.0.0');
		expect(newestReleaseTag(tags, 0)).toBe('v0.10.2');
		expect(newestReleaseTag(tags, 2)).toBeNull();
	});
});

describe('dependency specs', () => {
	it('parses the GitHub notations and keeps them when re-pointed', () => {
		for (const spec of [
			'github:calliope-edu/calliope-ui#95bdd39',
			'git+https://github.com/calliope-edu/calliope-ui.git#95bdd39',
			'calliope-edu/calliope-ui#95bdd39'
		]) {
			const parsed = parseGithubSpec(spec);
			expect(parsed).toMatchObject({ owner: 'calliope-edu', repo: 'calliope-ui', ref: '95bdd39' });
			expect(withRef(parsed!, 'v0.1.0')).toBe(spec.replace('95bdd39', 'v0.1.0'));
		}
		expect(parseGithubSpec('^1.0.0')).toBeNull();
		expect(parseGithubSpec('npm:@microbit/microbit-connection@1.0.0')).toBeNull();
		expect(parseGithubSpec('link:../calliope-ui')).toBeNull();
	});

	it('replaces only the named dependency', () => {
		const text = '{\n  "a": "github:o/a#1",\n  "b": "github:o/a#1"\n}';
		expect(replaceSpec(text, 'a', 'github:o/a#1', 'github:o/a#v2.0.0')).toBe(
			'{\n  "a": "github:o/a#v2.0.0",\n  "b": "github:o/a#1"\n}'
		);
	});
});

describe('channels', () => {
	it('auto is live for a tag and dev otherwise', () => {
		expect(channelOf('auto', { GITHUB_REF: 'refs/tags/calliope-v1.0.0' })).toBe('live');
		expect(channelOf('auto', { GITHUB_REF: 'refs/heads/calliope-main' })).toBe('dev');
		expect(channelOf('live', {})).toBe('live');
		expect(() => channelOf('auto', {})).toThrow();
		expect(() => channelOf('beta', {})).toThrow();
	});
});

const UI = 'calliope-edu/calliope-ui';
const WIDGET = 'calliope-edu/mini-connection-widget';

/** A fake GitHub: branch heads, tags (annotated ones peeled) and package.json versions. */
const remote = {
	async lsRemote(owner: string, repo: string, args: string[]): Promise<Array<[string, string]>> {
		const refs: Record<string, Array<[string, string]>> = {
			[UI]: [
				['ui-head', 'refs/heads/calliope-main'],
				['ui-010', 'refs/tags/v0.1.0'],
				['ui-tag-object-030', 'refs/tags/v0.3.0'],
				['ui-030', 'refs/tags/v0.3.0^{}'],
				['ui-100', 'refs/tags/v1.0.0']
			],
			[WIDGET]: [['w-head', 'refs/heads/main']]
		};
		const all = refs[`${owner}/${repo}`] ?? [];
		if (args.includes('--tags')) return all.filter(([, ref]) => ref.startsWith('refs/tags/'));
		return all.filter(([, ref]) => args.includes(ref));
	},
	async packageVersion(owner: string, repo: string, ref: string) {
		return ref === 'old-commit' ? '0.0.1' : '1.0.0';
	}
};

const app = `{
	"dependencies": {
		"@calliope-edu/ui": "github:${UI}#old-commit",
		"svelte": "^5.0.0"
	}
}
`;

describe('resolveAll', () => {
	const packages = ['@calliope-edu/ui', '@calliope-edu/mini-connection-widget'];

	it('dev takes the newest commit on calliope-main', async () => {
		const result = await resolveAll({
			text: app,
			packages,
			channel: 'dev',
			branch: 'calliope-main',
			remote
		});
		expect(result.text).toBe(app.replace('#old-commit', '#ui-head'));
		expect(result.build).toEqual({ ui: { tag: null, commit: 'ui-head' }, widget: null });
	});

	it('live takes the newest release tag within the pinned major, peeled to its commit', async () => {
		const result = await resolveAll({
			text: app,
			packages,
			channel: 'live',
			branch: 'calliope-main',
			remote
		});
		expect(result.text).toBe(app.replace('#old-commit', '#v0.3.0'));
		expect(result.build.ui).toEqual({ tag: 'v0.3.0', commit: 'ui-030' });
	});

	it('live reads the major from a range pin', async () => {
		const text = app.replace('#old-commit', '#semver:~0.1.0');
		const result = await resolveAll({
			text,
			packages,
			channel: 'live',
			branch: 'calliope-main',
			remote
		});
		// The major comes from the range; the newest 0.x tag wins, not the range's minor.
		expect(result.build.ui).toEqual({ tag: 'v0.3.0', commit: 'ui-030' });
	});

	it('fails when the pinned major has no release', async () => {
		const text = app.replace('#old-commit', '#v2.1.0');
		await expect(
			resolveAll({ text, packages, channel: 'live', branch: 'calliope-main', remote })
		).rejects.toThrow('no release tag v2.x.y');
	});

	it('fails when the dev branch is missing', async () => {
		const text = app.replace(
			`"svelte": "^5.0.0"`,
			`"@calliope-edu/mini-connection-widget": "github:${WIDGET}#abc"`
		);
		await expect(
			resolveAll({ text, packages, channel: 'dev', branch: 'calliope-main', remote })
		).rejects.toThrow(`${WIDGET} has no branch calliope-main`);
	});
});
