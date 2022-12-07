import { AstNode } from './ast';
import Scope from './scope';
import { walk } from './walk';

const analyzer = (ast: AstNode, magicString: any) => {
  const root = new Scope();
  ast._scope = root;
  let currentScope = ast._scope;

  const enter = (node: AstNode) => {
    if (node.type === 'FunctionDeclaration') {
      node._scope = new Scope({ parent: currentScope });
      currentScope = node._scope;
    }
    if (node.type === 'VariableDeclarator') {
      currentScope.add(node.id.name);
    }
  };

  const leave = (node: AstNode) => {
    if (node.type === 'FunctionDeclaration') {
      currentScope = node._scope.parent;
    }
  };

  ast.body.forEach((node: AstNode) => {
    walk(node, { enter, leave });
  });
};

export {
  analyzer,
};
