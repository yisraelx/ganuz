import { writeFile } from 'fs-extra';
import { getRootPath, relativeToRoot, toRepoURL } from '../utils/paths';
import { getPkgs, isPrivatePkg } from '../utils/pkg';

export default async function createPackageList() {
  let pkgList: any[] = await getPkgs();
  let mdList: string = `# Packages:\n`;

  for (let pkg of pkgList) {
    if (!isPrivatePkg(pkg)) {
      let gitPath: string = toRepoURL(relativeToRoot(pkg.location));
      let npmPath: string = `https://npmjs.com/package/${ pkg.name }`;
      let changelogPath: string = `${ gitPath }/CHANGELOG.md`;

      mdList += `- **${ pkg.name }** - [Git](${ gitPath }) - [Npm](${ npmPath }) - [CHANGELOG](${ changelogPath })\n`;
    }
  }

  let filePath: string = getRootPath('PACKAGES.md');
  return writeFile(filePath, mdList, {encoding: 'utf8'});
}
