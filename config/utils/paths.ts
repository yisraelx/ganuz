import { join, relative } from 'path';
import * as url from 'url';
import { readPkg } from './pkg';

const ROOT_PATH: string = join(__dirname, '../..');
const CONFIG_PATH: string = join(__dirname, '..');
const DEFAULT_BRANCH: string = 'master';
const REPOSITORY_URL: string = readPkg(ROOT_PATH).repository.url.replace('.git', '/');

export const TEMP_NAME: string = '.tmp';

export function getConfigPath(...paths): string {
  return join(CONFIG_PATH, ...paths);
}

export function getRootPath(...paths: string[]): string {
  return join(ROOT_PATH, ...paths);
}

export function relativeToRoot(cwd: string): string {
  return relative(getRootPath(), cwd);
}

export function toRepoURL(...paths): string {
  return url.resolve(REPOSITORY_URL, join('blob', DEFAULT_BRANCH, ...paths));
}
