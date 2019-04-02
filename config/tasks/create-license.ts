import { existsSync } from 'fs';
import { copy } from 'fs-extra';
import { resolve } from 'path';
import { getRootPath } from '../utils/paths';

const LICENSE_FILE_NAME: string = 'LICENSE';

export default async function copyLicense() {
  let licenseSrc: string = getRootPath(LICENSE_FILE_NAME);
  let licenseDest: string = resolve(LICENSE_FILE_NAME);

  if (!existsSync(licenseSrc) || licenseSrc === licenseDest) {
    throw Error(`Can not copy ${ licenseSrc } => ${ licenseDest }`);
  }

  return copy(licenseSrc, licenseDest);
}
