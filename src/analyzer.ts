import MagicString from 'magic-string';
import { AstNode } from './ast';
import Module from './module';
import Scope from './scope';
import { walk } from './walk';

const analyzer = (ast: AstNode, magicString: MagicString, module?: Module) => {
  let scope = new Scope();
  ast._scope = scope;

  ast.body.forEach((statement: AstNode) => {
    const addToScope = (node: AstNode) => {
      const name = node.id.name;
      scope.add(name);
      if (!scope.parent) {
        statement._defines[name] = true;
      }
    };

    Object.defineProperties(statement, {
      _defines: { value: {} },
      _dependsOn: { value: {} },
    });

    const enter = (node: AstNode) => {
      let newScope;
      switch (node.type) {
        case 'FunctionDeclaration':
          addToScope(node);
          const params = node.params.map((v: any) => v.name);

          newScope = new Scope({
            parent: scope,
            params,
          });

          break;
        case 'VariableDeclaration':
          node.declarations.forEach(addToScope);
        default:
          break;
      }

      if (newScope) {
        Object.defineProperties(node, {
          _scope: { value: newScope },
        });
        scope = newScope;
      }
    };

    const leave = (node: AstNode) => {
      if (node._scope) {
        if (scope.parent) {
          scope = scope.parent;
        }
      }
    };

    walk(statement, { enter, leave });
  });

  ast.body.forEach((statement: AstNode) => {
    walk(statement, {
      enter(node) {
        if (node.type === 'Identifier') {
          statement._dependsOn[node.name] = true;
        }
      },
      leave() {},
    })
  });
};

export {
  analyzer,
};
