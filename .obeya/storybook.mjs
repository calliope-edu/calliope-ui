// Starts and stops this workspace's Storybook dev server for Obeya workers.
//
//   node .obeya/storybook.mjs start   start in the background on a free port (from 6006),
//                                     wait until it answers, print its URL
//   node .obeya/storybook.mjs stop    stop the one this workspace started (no-op if none)
//
// State lives in .obeya/run/ (gitignored): storybook.json ({ pid, port, url }) and storybook.log.
// Stopping goes by the recorded PID, never by name: other workspaces run their own Storybook.

import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, openSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const runDir = join(root, '.obeya', 'run');
const stateFile = join(runDir, 'storybook.json');
const logFile = join(runDir, 'storybook.log');

function readState() {
	if (!existsSync(stateFile)) return null;
	try {
		return JSON.parse(readFileSync(stateFile, 'utf8'));
	} catch {
		return null;
	}
}

function isAlive(pid) {
	try {
		process.kill(pid, 0);
		return true;
	} catch {
		return false;
	}
}

// Storybook listens on 127.0.0.1 only. A bare listen(port) binds `::`, which on Windows succeeds
// even while another Storybook holds 127.0.0.1:port, so probe 127.0.0.1 itself, and `::` for
// anything else that would answer on localhost. A host without IPv6 counts as free there.
function canListen(port, host) {
	return new Promise((resolve) => {
		const server = createServer()
			.once('error', (err) => resolve(err.code === 'EAFNOSUPPORT' || err.code === 'EADDRNOTAVAIL'))
			.once('listening', () => server.close(() => resolve(true)))
			.listen({ port, host });
	});
}

async function portFree(port) {
	return (await canListen(port, '127.0.0.1')) && (await canListen(port, '::'));
}

async function freePort(from) {
	for (let port = from; port < from + 200; port++) if (await portFree(port)) return port;
	throw new Error(`no free port in ${from}–${from + 199}`);
}

async function start() {
	const state = readState();
	if (state && isAlive(state.pid)) {
		console.log(`Storybook already running (pid ${state.pid}): ${state.url}`);
		return;
	}
	mkdirSync(runDir, { recursive: true });
	const port = await freePort(6006);
	const url = `http://localhost:${port}/`;
	const log = openSync(logFile, 'w');
	// There is no prepare script (see README), so generate .svelte-kit/ here like `pnpm storybook` does.
	const kit = join(root, 'node_modules', '@sveltejs', 'kit', 'src', 'cli.js');
	execFileSync(process.execPath, [kit, 'sync'], { cwd: root, stdio: ['ignore', log, log] });
	const bin = join(root, 'node_modules', 'storybook', 'dist', 'bin', 'dispatcher.js');
	const child = spawn(process.execPath, [bin, 'dev', '-p', String(port), '--ci', '--no-open'], {
		cwd: root,
		detached: true,
		stdio: ['ignore', log, log],
		windowsHide: true
	});
	child.unref();
	writeFileSync(stateFile, JSON.stringify({ pid: child.pid, port, url }, null, '\t'));

	// An answer on the port alone proves nothing: if ours lost the port in a race, another workspace's
	// Storybook answers there while ours exits. So wait for our own log to report it ready on this
	// port, and check that it is still alive once the port answers.
	const ready = new RegExp(`Local:\\s+http://127\\.0\\.0\\.1:${port}/`);
	const deadline = Date.now() + 180_000;
	while (Date.now() < deadline) {
		if (!isAlive(child.pid)) {
			rmSync(stateFile, { force: true });
			throw new Error(`Storybook exited, see ${logFile}`);
		}
		try {
			if (
				ready.test(readFileSync(logFile, 'utf8')) &&
				(await fetch(`http://127.0.0.1:${port}/`)).ok &&
				isAlive(child.pid)
			) {
				console.log(`Storybook running (pid ${child.pid}): ${url}`);
				return;
			}
		} catch {}
		await new Promise((r) => setTimeout(r, 1000));
	}
	throw new Error(`Storybook did not answer on ${url} within 3 minutes, see ${logFile}`);
}

function stop() {
	const state = readState();
	if (state && isAlive(state.pid)) {
		try {
			if (process.platform === 'win32')
				execFileSync('taskkill', ['/T', '/F', '/PID', String(state.pid)], { stdio: 'ignore' });
			else process.kill(-state.pid, 'SIGTERM');
		} catch {}
		console.log(`Storybook stopped (pid ${state.pid})`);
	}
	rmSync(stateFile, { force: true });
}

const command = process.argv[2];
if (command === 'start') await start();
else if (command === 'stop') stop();
else {
	console.error('usage: node .obeya/storybook.mjs start|stop');
	process.exit(2);
}
