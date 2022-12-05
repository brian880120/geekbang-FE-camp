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
  test('it should work with nested level', () => {
    // const a = 1;

    // const f = () => {
    //   const b = 2;
    // };
    const root = new Scope('world');
    root.add('a');

    const level2 = new Scope({ parent: root });
    level2.add('b');

    const level3 = new Scope({ parent: level2 });
    level3.add('c');
  
    expect(level3.contains('a')).toBe(true);
    expect(level3.contains('b')).toBe(true);
    expect(level3.contains('c')).toBe(true);
    expect(level2.findDefiningScope('a')).toBe(root);
    expect(level2.findDefiningScope('b')).toBe(level2);
    expect(level3.findDefiningScope('a')).toBe(root);
  });
});
