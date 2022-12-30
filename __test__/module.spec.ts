import Module from '../src/module';

describe('test module', () => {
  describe('test constructor', () => {
    describe('imports', () => {
      test('single import', () => {
        const code = `
          import { a as aa } from '../src/module'; 
        `;
        const module = new Module({ code });
        expect(module.imports).toEqual({
          aa: {
            localName: 'aa',
            name: 'a',
            source: '../src/module',
          }
        });
      });
    });

    // describe('exports', () => {
    //   test('single export', () => {
    //     const code = `
    //       export const a = 1
    //     `;
    //     const module = new Module({ code });
    //     expect(module.exports['a'].localName).toBe('a');
    //     expect(module.exports['a'].node).toBe(module.ast.body[0]);
    //     expect(module.exports['a'].expression).toBe(module.ast.body[0].declaration);
    //   });
    // });

    describe('definitions', () => {
      test('single definitions', () => {
        const code = `
          const a = 1
        `;
        const module = new Module({ code });
        expect(module.definitions).toEqual({ a: module.ast.body[0] });
      });
    });
  });
});