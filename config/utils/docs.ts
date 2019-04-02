import ParseComments from 'parse-comments';
import { JSDoc, SourceFile, Symbol } from 'ts-morph';
import { getSymbolByExportName } from './ts-ast';

export function getDefaultExportDocs(file: string | SourceFile): IDoc {
  let symbol: Symbol = getSymbolByExportName(file, 'default');
  return getDocsBySymbol(symbol);
}

export interface IDoc {
  name?: string;
  kind?: string;
  declarations?: IDeclarationDocs[];
}

export interface IDeclarationDocs {
  declaration?: string;
  description?: string;
  tags?: {
    remarks?: string;
    returns?: string;
    params?: {name?: string, description?: string}[];
    throws?: string[];
    examples?: string[];
    see?: string[];
  };
}

export function getDocsBySymbol(symbol: Symbol): IDoc {
  let declarations: any[] = symbol.getDeclarations();
  let declaration: any = (symbol.getValueDeclaration && symbol.getValueDeclaration()) || declarations[0];
  let result = {
    name: symbol.getName(),
    kind: declaration.getKindName(),
    declarations: []
  };

  for (let declaration of declarations) {
    let declarationComments: JSDoc = (declaration.getJsDocs && declaration.getJsDocs() || [])[0];
    let declarationCommentsString: string = (declarationComments && declarationComments.getFullText()) || '';

    let docs = parseComments(declarationCommentsString);
    result.declarations.push({
      declaration: declaration.getText(),
      description: docs.description,
      tags: docs.tags
    });
  }

  return result;
}

export function parseComments(source: string) {
  let parser = new ParseComments();
  let parseResult: any = {};
  let tags = {
    params: [],
    examples: []
  };
  let docs: {description?: string, tags?: {[key: string]: any}} = {
    tags
  };

  try {
    parseResult = parser.parseComment(source);
  } catch (e) {
    return docs;
  }

  docs.description = parseResult.description;
  tags.examples = parseResult.examples.map(e => e.value) || [];

  for (let {title, name, description} of parseResult.tags) {
    switch (title) {
      case 'param':
        tags['params'].push({name, description});
        break;
      case 'throws':
      case 'see':
      case 'resource':
      case 'example':
        if (!tags[title]) {
          tags[title] = [];
        }
        tags[title].push(description);
        break;
      default:
        if (title in tags) {
          throw Error(`Invalid tag '${ title }'.`);
        }
        tags[title] = name || description;
    }
  }

  return docs;
}

export function parseTags(tags = []) {
  let result = {
    params: [],
    example: [],
    throws: [],
    see: []
  };

  for (let {title, name, description} of tags) {
    switch (title) {
      case 'name':
      case 'returns':
      case 'remarks':
        result[title] = name || description;
        break;
      case 'param':
        result['params'].push({name, description});
        break;
      case 'throws':
        result[title].push(name || description);
        break;
    }
  }
  return result;
}
