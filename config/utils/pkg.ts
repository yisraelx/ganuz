import { getPackages } from '@lerna/project';
import { readJSONSync } from 'fs-extra';
import { join } from 'path';
import { getRootPath } from './paths';

export function isPrivatePkg(pkg: any): boolean {
  return pkg.private || pkg.name.indexOf('/_') > -1;
}

export function isGroupPkg(pkg: any): boolean {
  return pkg.name.indexOf('/-') > -1;
}

export function readPkg(packagePath): any {
  let pkgPath: string = join(packagePath, 'package.json');
  return readJSONSync(pkgPath);
}

export function getPkgs(): any[] {
  let path: string = getRootPath();
  return getPackages(path);
}
