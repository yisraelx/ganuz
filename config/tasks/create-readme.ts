import { writeFile } from 'fs-extra';
import Handlebars from 'handlebars';
import { join } from 'path';
import { getDefaultExportDocs, IDoc } from '../utils/docs';
import getModuleInfo, { IModuleInfo, IModuleInfoEntry } from '../utils/module';
import { relativeToRoot, toRepoURL } from '../utils/paths';
import { getExportKeys } from '../utils/ts-ast';

Handlebars.registerHelper('ifNotEq', function(value, other, options) {
  return value !== other ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('moduleUrl', function(cwd: string, path: string) {
  return toRepoURL(relativeToRoot(cwd), path);
});

Handlebars.registerHelper('repoUrl', function(path: string) {
  return toRepoURL(path);
});

Handlebars.registerHelper('keys', function(entry: IModuleInfoEntry, browser: boolean) {
  let inputFile: string = join(entry.path, 'index.ts');
  let keys: string[] = getExportKeys(inputFile, browser, browser);

  return keys.join(',\n  ');
});

Handlebars.registerHelper('docs', function(path: string) {
  let inputPath: string = join(path, 'index.ts');
  let docs: IDoc = getDefaultExportDocs(inputPath);
  let extractTag = (tag: string) => docs.declarations.reduce((result: any[], declaration) => {
    let value: any[] = declaration.tags[tag] || [];
    return result.concat(value);
  }, []) || [];

  let md: string = '';
  let examples: string = extractTag('examples')
    .map((example: string) => `\`\`\`typescript\n${ example.replace(/^\n+|\n+$/g, '') }\n\`\`\``)
    .join('\n');

  if (examples) {
    md += `\n**Examples**\n${ examples }\n`;
  }

  let remarks: string = extractTag('remarks').join('\n').trim();
  if (remarks) {
    md += `\n*Note: ${ remarks }*\n`;
  }

  return md;
});

Handlebars.registerPartial('header', `
# {{ pkg.name }}
[![Source Code](https://img.shields.io/badge/%3C%2F%3E-source_code-blue.svg)]({{ moduleUrl paths.module '.'}})
[![Version](https://img.shields.io/npm/v/{{pkg.name}}.svg)](https://www.npmjs.com/package/{{pkg.name}})
[![MIT License](https://img.shields.io/npm/l/{{pkg.name}}.svg?color=yellow)]({{ repoUrl 'LICENSE'}})
[![Bundle Size](https://img.shields.io/bundlephobia/min/{{pkg.name}}.svg?color=green)](https://bundlephobia.com/result?p={{pkg.name}})
[![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue.svg)](https://www.typescriptlang.org)

{{#if pkg.description}}
**{{ pkg.description }}**
{{/if}}
`);

Handlebars.registerPartial('install', `
## Install
\`\`\`sh
$ yarn add {{ pkg.name }}
\`\`\`
Or
\`\`\`sh
$ npm install --save {{ pkg.name }}
\`\`\`
`);

Handlebars.registerPartial('use', `
## Use
{{#each entries  as |entry index|}}
{{#ifNotEq @root.pkg.name entry.pkg.name}}
### {{ entry.pkg.name }}
{{/ifNotEq}}
**Module**
\`\`\`typescript
{{#if entry.global}}
import {
  {{keys entry false}}
} from '{{entry.pkg.name}}';
{{else}}
  import '{{entry.pkg.name}}';
{{/if}}
\`\`\`

**Browser**
\`\`\`html
<script src="https://unpkg.com/{{ entry.pkg.name }}/bundle.umd.min.js"></script>
\`\`\`
{{#if entry.global}}
\`\`\`typescript
let {
  {{keys entry true}}
} = {{ lookup entry.global '0'}};
\`\`\`
{{/if}}
{{#if entry.global}}
{{#ifNotEq @root.type 'group' }}
{{docs entry.path}}
{{/ifNotEq}}
{{/if}}
{{/each}}
`);

Handlebars.registerPartial('license', `
## License
Copyright © [{{ pkg.author.name }}]({{ pkg.author.url }}),
Licensed under the [MIT license]({{repoUrl 'LICENSE'}}).
`);

let template = Handlebars.compile(`
{{> header }}
{{> install }}
{{#ifNotEq type 'internal'}}
{{> use }}
{{/ifNotEq}}
{{> license }}
`, {noEscape: true});

export default async function createReadme() {
  let moduleInfo: IModuleInfo = getModuleInfo(process.cwd());
  let readmePath: string = join(moduleInfo.paths.module, 'README.md');
  let readme: string = template(moduleInfo).trim();

  return writeFile(readmePath, readme, {encoding: 'utf8'});
}
