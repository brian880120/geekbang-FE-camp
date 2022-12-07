const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const MagicString = require('magic-string');

const code = fs.readFileSync(path.join(__dirname, './source.js'), 'utf-8').toString();

const getSnipByPosition = (start, end) => {
  return magicString.snip(start, end).toString();
}

const ast = acorn.parse(code, {
  locations: true,
  ranges: true,
  sourceType: 'module',
  ecmaVersion: 7,
});

const magicString = new MagicString(code);

const declarations = {};

const statements = [];

ast.body.filter((node) => {
  return node.type === 'VariableDeclaration';
}).forEach(node => {
  declarations[node.declarations[0].id.name] = node;
});

ast.body.filter(node => {
  return node.type === 'ExpressionStatement';
}).forEach(node => {
  const callee = node.expression.callee.name;
  statements.push(declarations[callee]);
  statements.push(node);
});

statements.forEach(node => {
  console.log(getSnipByPosition(node.start, node.end));
});
