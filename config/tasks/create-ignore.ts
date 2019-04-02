import { writeFile } from 'fs-extra';
import { resolve } from 'path';

const IGNORE_LIST: string[] = [
  '*.ts',
  '!*.d.ts',
  '__tests__',
];

export default async function createIgnore() {
  let filePath: string = resolve('.npmignore');
  let context: string = IGNORE_LIST.join('\n');

  return writeFile(filePath, context, {encoding: 'utf8'});
}
