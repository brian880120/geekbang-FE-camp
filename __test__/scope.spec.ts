import Scope from '../src/scope';

describe('test scope', () => {
  test('it should work', () => {
    // const a = 1;

    // const f = () => {
    //   const b = 2;
    // };
    const root = new Scope('world');
    root.add('a');

    const child = new Scope({ parent: root });
    child.add('b');
  
    expect(child.contains('a')).toBe(true);
    expect(child.contains('b')).toBe(true);
    expect(child.findDefiningScope('a')).toBe(root);
    expect(child.findDefiningScope('b')).toBe(child);
  });
});
