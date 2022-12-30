import { getAst, AstNode } from '../src/ast';
import { analyzer } from '../src/analyzer';
import { getMagicString } from '../src/magicString';
import MagicString from 'magic-string';

interface IArgs {
  code: string;
}

interface IImports {
  [name: string]: { localName: string, name: string, source: string };
}

interface IExports {
  [name: string]: { localName: string, node: AstNode, expression: any };
}

interface IDefinitions {
  [name: string]: AstNode;
}

class Module {
  ast: any;
  imports!: IImports;
  exports!: IExports;
  definitions!: IDefinitions;
  code: MagicString;

  constructor(args: IArgs) {
    this.ast = getAst(args.code);
    this.code = getMagicString(args.code).magicString;
    this.analyse();
  }

  analyse(): void {
    this.imports = {};
    this.exports = {};
    this.definitions = {};

    this.ast.body.forEach((node: AstNode) => {
      if (node.type === 'ImportDeclaration') {
        const source = node.source.value;
        const { specifiers } = node;
        specifiers.forEach((specifier: any) => {
          const localName = specifier.local?.name || '';
          const name = specifier.imported?.name || '';
          this.imports[localName] = {
            name,
            localName,
            source,
          };
        });
      } else if (/^Export/.test(node.type)) {
        const declaration = node.declaration;
        if (declaration.type === 'VariableDeclaration') {
          if (!declaration.declarations) return;
          const localName = declaration.declarations[0].id.name;
          this.exports[localName] = {
            node,
            localName,
            expression: declaration,
          };
        }
      }
    });

    analyzer(this.ast, this.code, this);
    this.ast.body.forEach((statement: any) => {
      Object.keys(statement._defines).forEach(name => {
        this.definitions[name] = statement;
      });
    });
  }
}

export default Module;
