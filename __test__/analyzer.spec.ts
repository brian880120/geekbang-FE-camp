import MagicString from 'magic-string';
import acorn from 'acorn';
import { analyzer } from '../src/analyzer';

const getCode = (code: string): {ast: any, magicString: any} => {
  return {
    ast: acorn.parse(code, {
      locations: true,
      ranges: true,
      sourceType: 'module',
      ecmaVersion: 7,
    }),
    magicString: new MagicString(code),
  };
};

describe('test analyzer', () => {
  test('it should work', () => {
    const { ast, magicString } = getCode(`
      const a = 1
      const b = 2
    `);
    analyzer(ast, magicString);
    expect(ast._scope.contains('a')).toBe(true);
    expect(ast._scope.contains('b')).toBe(true);
    expect(ast._scope.findDefiningScope('a')).toEqual(ast._scope);
    expect(ast._scope.findDefiningScope('b')).toEqual(ast._scope);
  });
});
