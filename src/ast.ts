import * as  acorn from 'acorn';
import { getMagicString } from './magicString';

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

const declarations: { [name: string]: any } = {};

const statements: any[] = [];

const ast = getAst(code);

ast.body.filter((node: any) => {
  return node.type === 'VariableDeclaration';
}).forEach((node: any) => {
  declarations[node.declarations[0].id.name] = node;
});

ast.body.filter((node: any) => {
  return node.type === 'ExpressionStatement';
}).forEach((node: any) => {
  const callee = node.expression.callee.name;
  statements.push(declarations[callee]);
  statements.push(node);
});

statements.forEach(node => {
  console.log(getSnipByPosition(node.start, node.end));
});
