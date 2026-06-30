import { existsSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { config } from 'dotenv';

function getWorkspaceRoot(cwd: string) {
  const parent = dirname(cwd);

  if (basename(cwd) === 'api' && basename(parent) === 'apps') {
    return resolve(cwd, '../..');
  }

  return cwd;
}

const apiRoot = process.cwd();
const workspaceRoot = getWorkspaceRoot(apiRoot);
const envFiles = [
  resolve(apiRoot, '.env.local'),
  resolve(apiRoot, '.env'),
  resolve(workspaceRoot, '.env.local'),
  resolve(workspaceRoot, '.env'),
];

for (const path of envFiles) {
  if (existsSync(path)) {
    config({ path });
  }
}
