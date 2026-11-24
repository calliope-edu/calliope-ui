// The shared dispatch action (.github/actions/dispatch-calliope-builds): which builds a push or a
// release starts, without network: the GitHub API is faked.
import { describe, expect, it } from 'vitest';
import {
	dispatchAll,
	newestTag,
	parseChannels,
	planDispatches
} from '../.github/actions/dispatch-calliope-builds/dispatch-calliope-builds.mjs';
import buildsJson from '../.github/actions/dispatch-calliope-builds/builds.json';

const builds = [
	{
		repo: 'calliope-edu/fork',
		workflow: 'calliope-build.yml',
		dev: { ref: 'calliope-main' },
		live: { tagPrefix: 'calliope-v' }
	},
	{
		repo: 'calliope-edu/own',
		workflow: 'calliope-build.yml',
		dev: { ref: 'calliope-main' },
		live: { tagPrefix: 'v' }
	},
	{
		repo: 'calliope-edu/calliope-campus',
		workflow: 'campus-image.yml',
		dev: { ref: 'main', inputs: { ref: 'main' } }
	}
];

const tags: Record<string, string[]> = {
	'calliope-edu/fork': ['calliope-v1.0.0', 'calliope-v1.10.0', 'calliope-v1.9.2'],
	'calliope-edu/own': ['v1.0.0', 'v1.0.1', 'v2.0.0-rc.1']
};

const api = {
	async tags(repo: string, prefix: string) {
		return (tags[repo] ?? []).filter((t) => t.startsWith(prefix));
	}
};

describe('channels', () => {
	it('takes dev, live or both in a fixed order', () => {
		expect(parseChannels('dev')).toEqual(['dev']);
		expect(parseChannels('live, dev')).toEqual(['dev', 'live']);
		expect(parseChannels('dev live')).toEqual(['dev', 'live']);
	});

	it('refuses anything else', () => {
		expect(() => parseChannels('prod')).toThrow();
		expect(() => parseChannels('  ')).toThrow();
	});
});

describe('newest tag', () => {
	it('compares versions, not text, and ignores pre-releases and other prefixes', () => {
		expect(newestTag(tags['calliope-edu/fork'], 'calliope-v')).toBe('calliope-v1.10.0');
		expect(newestTag(tags['calliope-edu/own'], 'v')).toBe('v1.0.1');
		expect(newestTag(['calliope-v3.0.0', 'v1.2.0'], 'v')).toBe('v1.2.0');
		expect(newestTag(['vv9.0.0', 'v0.1.0'], 'v')).toBe('v0.1.0');
		expect(newestTag(['latest'], 'v')).toBeNull();
	});
});

describe('planned builds', () => {
	it('starts the dev builds on their dev branches', async () => {
		const { dispatches, errors } = await planDispatches({ builds, channels: ['dev'], api });
		expect(errors).toEqual([]);
		expect(dispatches.map((d) => [d.repo, d.ref, d.inputs])).toEqual([
			['calliope-edu/fork', 'calliope-main', {}],
			['calliope-edu/own', 'calliope-main', {}],
			['calliope-edu/calliope-campus', 'main', { ref: 'main' }]
		]);
	});

	it('starts the live builds on their newest release tags, Campus not', async () => {
		const { dispatches } = await planDispatches({ builds, channels: ['live'], api });
		expect(dispatches.map((d) => [d.repo, d.channel, d.ref])).toEqual([
			['calliope-edu/fork', 'live', 'calliope-v1.10.0'],
			['calliope-edu/own', 'live', 'v1.0.1']
		]);
	});

	it('reports a live build without a release tag and plans the others', async () => {
		const noTags = {
			async tags() {
				return [];
			}
		};
		const { dispatches, errors } = await planDispatches({
			builds,
			channels: ['dev', 'live'],
			api: noTags
		});
		expect(dispatches).toHaveLength(3);
		expect(errors).toEqual([
			'calliope-edu/fork (live): no release tag calliope-vX.Y.Z',
			'calliope-edu/own (live): no release tag vX.Y.Z'
		]);
	});

	it('lists real apps in builds.json', () => {
		const list = buildsJson.builds as Array<Record<string, unknown>>;
		expect(list.length).toBeGreaterThan(0);
		for (const build of list) {
			expect(build.repo).toMatch(/^calliope-edu\/[\w.-]+$/);
			expect(build.workflow).toMatch(/\.ya?ml$/);
			expect(build.dev ?? build.live).toBeTruthy();
		}
	});
});

describe('dispatching', () => {
	it('starts every run even when one fails', async () => {
		const { dispatches } = await planDispatches({ builds, channels: ['dev'], api });
		const calls: string[] = [];
		const { started, errors } = await dispatchAll({
			dispatches,
			api: {
				async dispatch(repo: string, workflow: string, ref: string) {
					calls.push(`${repo}@${ref}`);
					if (repo === 'calliope-edu/own') throw new Error('404 Not Found');
				}
			}
		});
		expect(calls).toHaveLength(3);
		expect(started.map((d) => d.repo)).toEqual([
			'calliope-edu/fork',
			'calliope-edu/calliope-campus'
		]);
		expect(errors).toEqual(['calliope-edu/own (dev): 404 Not Found']);
	});
});
