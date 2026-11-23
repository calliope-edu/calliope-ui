#!/usr/bin/env node
// Next release version for the release workflow (.github/workflows/release.yml).
//
//   node scripts/release-version.mjs patch|minor|major|X.Y.Z [--write]
//
// Starts from the higher of `version` in package.json and the newest tag vX.Y.Z, bumps it (or
// takes the given X.Y.Z, which must be higher), prints the new version without `v`, and with
// --write sets it in package.json.

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import {
	bumpVersion,
	compareVersions,
	formatVersion,
	newestReleaseTag,
	parseVersion
} from '../.github/actions/resolve-calliope-deps/semver.mjs';

/**
 * @param {{ packageVersion: string, tags: string[], bump: string }} options
 * @returns {string} the new version, `X.Y.Z`
 */
export function nextVersion({ packageVersion, tags, bump }) {
	const fromPackage = parseVersion(packageVersion);
	if (!fromPackage) throw new Error(`package.json has version "${packageVersion}", not X.Y.Z`);
	const newestTag = newestReleaseTag(tags);
	const fromTag = newestTag ? parseVersion(newestTag) : null;
	const current = fromTag && compareVersions(fromTag, fromPackage) > 0 ? fromTag : fromPackage;

	const explicit = parseVersion(bump);
	if (explicit) {
		if (compareVersions(explicit, current) <= 0) {
			throw new Error(`${bump} is not higher than the current ${formatVersion(current)}`);
		}
		if (tags.includes(`v${formatVersion(explicit)}`)) throw new Error(`v${bump} exists already`);
		return formatVersion(explicit);
	}
	return formatVersion(bumpVersion(current, bump));
}

/**
 * Sets the top-level `version` in the package.json text, keeping its formatting.
 * @param {string} text
 * @param {string} version
 */
export function setPackageVersion(text, version) {
	const pattern = /^(\s*"version"\s*:\s*)"[^"]*"/m;
	if (!pattern.test(text)) throw new Error('package.json has no "version" field');
	return text.replace(pattern, (_, key) => `${key}"${version}"`);
}

function main() {
	const [bump, ...flags] = process.argv.slice(2);
	if (!bump) throw new Error('Usage: release-version.mjs patch|minor|major|X.Y.Z [--write]');
	const text = readFileSync('package.json', 'utf8');
	const tags = execFileSync('git', ['tag', '--list', 'v*'], { encoding: 'utf8' })
		.split('\n')
		.filter(Boolean);
	const version = nextVersion({ packageVersion: JSON.parse(text).version, tags, bump });
	if (flags.includes('--write')) writeFileSync('package.json', setPackageVersion(text, version));
	console.log(version);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
	try {
		main();
	} catch (error) {
		console.error(error instanceof Error ? error.message : error);
		process.exit(1);
	}
}
