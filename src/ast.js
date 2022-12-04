const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const MagicString = require('magic-string');

const code = fs.readFileSync(path.join(__dirname, './source.js'), 'utf-8').toString();

const getSnipByPosition = (start, end) => {
  return magicString.snip(start, end).toString();
}

const vst = acorn.parse(code, {
  locations: true,
  ranges: true,
  sourceType: 'module',
  ecmaVersion: 7,
});

const magicString = new MagicString(code);

const declarations = {};

const statements = [];

vst.body.forEach(node => {
  if (node.type === 'VariableDeclaration') {
    const elem = node.declarations[0];
    const start = node.start;
    const end = node.end;
    declarations[elem.id.name] = getSnipByPosition(start, end);
  }

  if (node.type === 'ExpressionStatement') {
    const callerName = node.expression.callee.name;
    const { start, end } = node;
    const statement = getSnipByPosition(start, end);
    statements.push(declarations[callerName]);
    statements.push(statement);
  }
});

console.log('statements');
console.log(statements.join(''));
