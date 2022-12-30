import * as acorn from 'acorn';
import { getMagicString } from './magicString';

export type AstNode = any;

export const getAst = (code: string) => {
  const ast: any = acorn.parse(code, {
    locations: true,
    ranges: true,
    sourceType: 'module',
    ecmaVersion: 7,
  });

  return ast;
};

const code = `
  const a = () => 1;
  const b = () => 2;
  a();
`;

const { getSnipByPosition } = getMagicString(code);

const declarations: { [name: string]: AstNode } = {};

const statements: AstNode[] = [];

const ast = getAst(code);

ast.body.filter((node: AstNode) => {
  return node.type === 'VariableDeclaration';
}).forEach((node: AstNode) => {
  declarations[node.declarations[0].id.name] = node;
});

ast.body.filter((node: AstNode) => {
  return node.type === 'ExpressionStatement';
}).forEach((node: AstNode) => {
  const callee = node.expression.callee.name;
  statements.push(declarations[callee]);
  statements.push(node);
});
