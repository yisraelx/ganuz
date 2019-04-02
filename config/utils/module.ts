import * as fs from 'fs';
import { existsSync } from 'fs';
import { join } from 'path';
import { TEMP_NAME } from './paths';
import { readPkg } from './pkg';

export interface IModuleInfoEntry {
  name?: string;
  global?: string[];
  path?: string;
  exports?: string[];
  pkg?: any;
}

export interface IModuleInfoPaths {
  module?: string;
  temp?: string;
}

export interface IModuleInfo {
  scope?: string | boolean;
  type?: ModuleType;
  paths?: IModuleInfoPaths;
  pkg?: any;
  entries?: IModuleInfoEntry[];
}

export enum ModuleType {
  normal = 'normal',
  internal = 'internal',
  group = 'group',
}

const MODULE_INFO = {};

export default function getModuleInfo(modulePath: string): IModuleInfo {
  if (modulePath in MODULE_INFO) {
    return MODULE_INFO[modulePath];
  }

  let entries: IModuleInfoEntry[] = getEntriesName(modulePath).map((name: string) => {
    let entryPath: string = join(modulePath, name);
    let pkg = readPkg(entryPath);

    return {
      name,
      global: typeof pkg.global === 'string' && pkg.global.split('.'),
      path: entryPath,
      pkg
    };
  });

  let pkg: any = readPkg(modulePath);
  let [scopeName, packageName = pkg.name] = pkg.name.slice(1).split('/');
  let [contextName, exportName] = pkg.global.split('.');
  let scope = pkg.name[0] === '@' && scopeName;
  let type = scope ?
    (packageName[0] === '_' ? ModuleType.internal :
      packageName[0] === '-' ? ModuleType.group :
        ModuleType.normal) : (exportName ? ModuleType.normal : ModuleType.group);

  return {
    scope,
    type,
    paths: {
      module: modulePath,
      temp: join(modulePath, TEMP_NAME),
    },
    pkg,
    entries,
  };

}

export function isModulePath(path: string): boolean {
  let pkgPath: string = join(path, 'package.json');
  return existsSync(pkgPath) && require(pkgPath).version;
}

function getEntriesName(dir: string): string[] {
  return fs.readdirSync(dir).reduce((result, entry) => {
    if (fs.existsSync(join(dir, entry, 'package.json'))) {
      result.push(entry);
    }
    return result;
  }, ['.']);
}


