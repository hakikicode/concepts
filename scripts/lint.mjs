import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const roots = ['src', 'tests', 'scripts'];
const failures = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.isFile() && path.endsWith('.js')) await lintFile(path);
  }
}

async function lintFile(path) {
  const content = await readFile(path, 'utf8');
  if (content.includes('try {') && content.includes('import(')) {
    failures.push(`${path}: imports must not be wrapped in try/catch blocks`);
  }
  if (content.includes('console.log') && !path.endsWith('logger.js')) {
    failures.push(`${path}: use the shared logger instead of console.log`);
  }
}

await Promise.all(roots.map(walk));

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}
