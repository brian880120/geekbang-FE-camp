import * as acorn from "acorn";
import { walk } from "./walk";

const code = `
  const a = 1

  function f1() {
    const b = 2
    function f2() {
      const c = 3
    }
  }
`;

const ast: any = acorn.parse(code, {
  locations: true,
  ranges: true,
  sourceType: 'module',
  ecmaVersion: 7,
});

const generateIndentation = () => {
  let indentation = 0;

  walk(ast, {
    enter(node, _) {
      if (node.type === 'VariableDeclarator') {
        console.log('%svar:', ' '.repeat(indentation), node.id.name);
      }
      if (node.type === 'FunctionDeclaration') {
        console.log('%sfunc:', ' '.repeat(indentation), node.id.name);
        indentation += 2;
      }
    },
    leave(node, _) {
      if (node.type === 'FunctionDeclaration') {
        indentation -= 2;
      }
    },
  });
};
generateIndentation();