import { walk } from '../src/walk';

describe('AST Walk函数', () => {
  it('should work for single node', () => {
    const ast = {
      a: '1',
    };
    const mockEnter = jest.fn();
    const mockLeave = jest.fn();

    walk(ast, {
      enter: mockEnter,
      leave: mockLeave,
    });

    let calls = mockEnter.mock.calls;

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toEqual({ a: '1' });
    calls = mockLeave.mock.calls;

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toEqual({ a: '1' });
  });
  it('should work for node with children', () => {
    const ast = {
      a: [{ b: '2' }],
    };
    const mockEnter = jest.fn();
    const mockLeave = jest.fn();

    walk(ast, {
      enter: mockEnter,
      leave: mockLeave,
    });

    let calls = mockEnter.mock.calls;

    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ a: [{ b: '2' }] });
    expect(calls[1][0]).toEqual([{ b: '2' }]);
    expect(calls[2][0]).toEqual({ b: '2' });

    calls = mockLeave.mock.calls;

    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ b: '2' });
    expect(calls[1][0]).toEqual([{ b: '2' }]);
    expect(calls[2][0]).toEqual({ a: [{ b: '2' }] });
  });
  it('should work with multiple nodes', () => {
    const ast = {
      a: {
        b: 1
      },
      c: {
        d: 2
      }
    };
    const mockEnter = jest.fn();
    const mockLeave = jest.fn();

    walk(ast, {
      enter: mockEnter,
      leave: mockLeave,
    });

    let calls = mockEnter.mock.calls;

    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({
      a: {
        b: 1
      },
      c: {
        d: 2
      }
    });
    expect(calls[1][0]).toEqual({ b: 1 });
    expect(calls[2][0]).toEqual({ d: 2 });

    calls = mockLeave.mock.calls;

    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ b: 1 });
    expect(calls[1][0]).toEqual({ d: 2 });
    expect(calls[2][0]).toEqual({
      a: {
        b: 1
      },
      c: {
        d: 2
      }
    });
  });
});
