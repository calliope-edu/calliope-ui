// Minimal SemVer helpers for release tags `vX.Y.Z` (no pre-releases, no build metadata).
// Shared by the resolve-calliope-deps action and the release workflow.

const VERSION = /^v?(\d+)\.(\d+)\.(\d+)$/;

/**
 * @param {string} text `1.2.3` or `v1.2.3`
 * @returns {[number, number, number] | null}
 */
export function parseVersion(text) {
	const m = VERSION.exec(text.trim());
	return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

/**
 * @param {[number, number, number]} a
 * @param {[number, number, number]} b
 */
export function compareVersions(a, b) {
	return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
}

/** @param {[number, number, number]} v */
export function formatVersion(v) {
	return v.join('.');
}

/**
 * The next version after `current` for a `patch`, `minor` or `major` bump.
 * @param {[number, number, number]} current
 * @param {string} bump
 * @returns {[number, number, number]}
 */
export function bumpVersion(current, bump) {
	const [major, minor, patch] = current;
	if (bump === 'major') return [major + 1, 0, 0];
	if (bump === 'minor') return [major, minor + 1, 0];
	if (bump === 'patch') return [major, minor, patch + 1];
	throw new Error(`Unknown bump "${bump}": use patch, minor or major.`);
}

/**
 * The newest of the given tag names that is a release tag `vX.Y.Z`, optionally within one
 * major version. Other tags (pre-releases, `calliope-v…`, anything else) are ignored.
 * @param {string[]} tags
 * @param {number} [major]
 * @returns {string | null}
 */
export function newestReleaseTag(tags, major) {
	/** @type {{ tag: string, version: [number, number, number] } | null} */
	let best = null;
	for (const tag of tags) {
		if (!tag.startsWith('v')) continue;
		const version = parseVersion(tag);
		if (!version || (major !== undefined && version[0] !== major)) continue;
		if (!best || compareVersions(version, best.version) > 0) best = { tag, version };
	}
	return best ? best.tag : null;
}
