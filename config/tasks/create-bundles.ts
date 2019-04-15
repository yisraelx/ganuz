import { join } from 'path';
import { ModuleFormat, OutputOptions, rollup, RollupOptions } from 'rollup';
import cleanUpPlugin from 'rollup-plugin-cleanup';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import sourceMapPlugin from 'rollup-plugin-sourcemaps';
import tsPlugin from 'rollup-plugin-typescript2';
import { uglify as uglifyPlugin } from 'rollup-plugin-uglify';
import * as typescript from 'typescript';
import getModuleInfo, { IModuleInfo, IModuleInfoEntry, ModuleType } from '../utils/module';
import { getRootPath } from '../utils/paths';

export interface IBuild {
  target?: string;
  format?: ModuleFormat;
  field?: string;
  minify?: boolean;
}

let BUILDS: IBuild[] = [
  {target: 'ESNEXT', format: 'es', field: 'esnext'},
  {target: 'ES5', format: 'es', field: 'module'},
  {target: 'ES5', format: 'umd', field: 'browser'},
  {target: 'ES5', format: 'umd', field: 'browser', minify: true}
];

async function build(moduleInfo: IModuleInfo, entryInfo: IModuleInfoEntry, buildInfo: IBuild) {

  let inputFilePath: string = join(entryInfo.path, 'index.ts');
  let field: string = entryInfo.pkg[buildInfo.field];
  let isBrowser: boolean = buildInfo.field === 'browser';
  let outputFilePath: string = join(entryInfo.path, buildInfo.minify ? field.replace('js', 'min.js') : field);
  let banner = `/*!
* @module ${ entryInfo.pkg.name }
* @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
* @license MIT
*/
`;

  let inputOptions: RollupOptions = {
    input: inputFilePath,
    plugins: [
      isBrowser && nodeResolvePlugin({mainFields: ['module', 'main']}),
      tsPlugin({
        typescript,
        tsconfig: getRootPath('tsconfig.json'),
        tsconfigOverride: {
          compilerOptions: {
            target: buildInfo.target,
            module: 'ESNEXT',
            declaration: false
          },
          include: [join(entryInfo.path, '*.ts')],
          exclude: [join(entryInfo.path, '__tests__/*')]
        }
      }),
      isBrowser && sourceMapPlugin(),
      !buildInfo.minify && cleanUpPlugin({comments: 'none', extensions: ['ts']}),
      buildInfo.minify && uglifyPlugin({output: {comments: false, preamble: banner}})
    ]
  };

  let outputOptions: OutputOptions = {
    banner,
    amd: {
      id: entryInfo.pkg.name,
    },
    extend: true,
    file: outputFilePath,
    format: buildInfo.format,
    indent: true,
    interop: true,
    exports: 'named',
    sourcemap: true
  };

  if (isBrowser) {
    if (entryInfo.global) {
      let [contextName, exportName] = entryInfo.global;
      outputOptions.name = contextName;
      if (moduleInfo.type === ModuleType.normal && exportName) {
        outputOptions.outro = `exports.${ exportName } = exports.default;`;
      }
    } else {
      outputOptions.exports = 'none';
    }
  } else {
    inputOptions.external = (id: string) => id[0] !== '.';
  }

  let roll = await rollup(inputOptions);

  await roll.write(outputOptions);
}

export default async function bundle() {
  let moduleInfo: IModuleInfo = getModuleInfo(process.cwd());

  for (let entryInfo of moduleInfo.entries) {
    for (let buildInfo of BUILDS) {
      await build(moduleInfo, entryInfo, buildInfo);
    }
  }
}
