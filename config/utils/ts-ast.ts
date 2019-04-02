import { ModuledNode, Project, SourceFile, Statement, Symbol } from 'ts-morph';

const PROJECT: Project = new Project({
  addFilesFromTsConfig: false,
  compilerOptions: {
    noEmit: true
  }
});

export function getSourceFile(file: string | SourceFile): SourceFile & ModuledNode {
  return typeof file !== 'string' ? file : PROJECT.getSourceFile(file) || PROJECT.addExistingSourceFile(file);
}

export function getExportSymbols(file: string | SourceFile): Symbol[] {
  return getSourceFile(file).getExportSymbols();
}

export type IExportSymbolMap = {[key: string]: Symbol};

export function getExportSymbolsMap(file: string | SourceFile): IExportSymbolMap {
  return getExportSymbols(file).reduce((result, sym: Symbol) => {
    let name: string = sym.getName();
    result[name] = sym.isAlias() ? sym.getAliasedSymbol() : sym;
    return result;
  }, {});
}

export function getSymbolByName(file: string | SourceFile, symbolName: string): Symbol {
  let statement = getSourceFile(file)
    .getStatement((statement: Statement) => {
      let statementSymbol: Symbol = statement.getSymbol();
      return statementSymbol && statementSymbol.getName() === symbolName;
    });
  return statement && statement.getSymbol();
}

export function getSymbolByExportName(file: string | SourceFile, exportName: string): Symbol {
  let symbol: Symbol = getSourceFile(file).getSymbol().getExportByName(exportName);
  return symbol && symbol.isAlias() ? symbol.getAliasedSymbol() : symbol;
}

export function getExportKeys(file: string | SourceFile, onlyValue?: boolean, defaultToName?: boolean): string[] {
  let map = getExportSymbolsMap(file);
  return Object.keys(map).reduce((result: string[], key: string) => {
    if (!onlyValue || map[key].getValueDeclaration()) {
      result.push(key === 'default' ?
        `${ defaultToName ? '' : 'default as ' }${ map[key].getName() }`
        : key);
    }
    return result;
  }, []);
}

