import { analyzer } from '../src/analyzer';
import { getAst } from '../src/ast';
import { getMagicString } from '../src/magicString';

describe('test analyzer', () => {
  test('it should work', () => {
    const code = `
      const a = 1
    `;

    const ast = getAst(code);
    const { magicString } = getMagicString(code);

    analyzer(ast, magicString);

    expect(ast._scope.contains('a')).toBe(true);
    expect(ast._scope.findDefiningScope('a')).toEqual(ast._scope);
    expect(ast.body[0]._defines).toEqual({ a: true });
  });

  describe('_dependsOn', () => {
    test('_dependsOn should work with single statement', () => {
      const code = `
        const a = 1
      `;

      const ast = getAst(code);
      const { magicString } = getMagicString(code);

      analyzer(ast, magicString);
      expect(ast.body[0]._dependsOn).toEqual({ a: true });
    });

    test('_dependsOn should work with multiple statements', () => {
      const code = `
        const a = 1
        function f() {
          const b = 2
        }
      `;

      const ast = getAst(code);
      const { magicString } = getMagicString(code);

      analyzer(ast, magicString);
      expect(ast.body[0]._dependsOn).toEqual({ a: true });
      expect(ast.body[1]._dependsOn).toEqual({ f: true, b: true });
    });
  });
});
