import MagicString from 'magic-string';
import Scope from './scope';
import { walk } from './walk';

const analyzer = (ast: any, magicString: any) => {
  const root = new Scope('root');
  ast._scope = root;
  let currentScope = ast._scope;

  const enter = (node: any) => {
    if (node.type === 'FunctionDeclaration') {
      node._scope = new Scope({ parent: currentScope });
      currentScope = node._scope;
    }
    if (node.type === 'VariableDeclarator') {
      currentScope.add(node.id.name);
    }
  };

  const leave = (node: any) => {
    if (node.type === 'FunctionDeclaration') {
      currentScope = node._scope.parent;
    }
  };

  ast.body.forEach((node: any) => {
    walk(node, { enter, leave });
  });
};

export {
  analyzer,
};
