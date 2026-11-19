import fs from 'node:fs/promises';
import path from 'node:path';
import { sync_skills } from './sync-skills.ts';

const DEVIN_PLUGIN_DIR = './plugins/devin/svelte';
const TOOLS_DIR = './tools';

/**
 * Sync Devin-compatible subagents from the shared source.
 *
 * Devin uses the same frontmatter format as Claude-compatible agents, but does
 * not need Claude's permissionMode field.
 */
async function sync_agents() {
	const source = path.join(TOOLS_DIR, 'agents');
	const dest = path.join(DEVIN_PLUGIN_DIR, 'agents');

	await fs.rm(dest, { recursive: true, force: true });
	await fs.mkdir(dest, { recursive: true });

	const files = await fs.readdir(source);

	for (const file of files) {
		if (!file.endsWith('.md')) continue;
		await fs.copyFile(path.join(source, file), path.join(dest, file));
	}

	console.log('Synced agents to Devin plugin');
}

async function sync_rules() {
	await fs.copyFile(
		path.join(TOOLS_DIR, 'instructions', 'AGENTS.md'),
		path.join(DEVIN_PLUGIN_DIR, 'AGENTS.md'),
	);

	console.log('Synced AGENTS.md to Devin plugin');
}

await sync_skills(path.join(TOOLS_DIR, 'skills'), path.join(DEVIN_PLUGIN_DIR, 'skills'));
await sync_agents();
await sync_rules();

console.log('Devin plugin sync complete');
