import { describeGlobalPatch } from '../../../config/utils/jest';
import construct from '@ganuz/construct';

describeGlobalPatch<typeof construct>('construct()', 'Reflect.construct', '@ganuz/construct', (construct) => {
  it(`should be throws if target is not constructor`, () => {
    expect(() => {
      construct(null, [], class {
      });
    }).toThrow();
    expect(() => {
      (construct as any)({}, [], class {
      });
    }).toThrow();
  });

  it(`should be throws if args is not ArrayLike`, () => {
    expect(() => {
      construct(class {
      }, null, class {
      });
    }).toThrow();
    expect(() => {
      (construct as any)(class {
      }, 1, class {
      });
    }).toThrow();
  });

  it(`should be throws if newTarget is not constructor`, () => {
    expect(() => {
      (construct as any)(class {
      }, [], null);
    }).toThrow();
    expect(() => {
      (construct as any)(class {
      }, [], {});
    }).toThrow();
  });

  it(`should create instance with ArrayLike args`, () => {
    expect(construct(function (...args) {
      return args;
    }, [1, 3, 5])).toEqual([1, 3, 5]);
  });

  it(`should create instance of target and apply target`, () => {
    class A {
      args: string[];
      foo: string;

      constructor(...args: string[]) {
        this.args = args;
      }
    }

    A.prototype.foo = 'bar';

    let a: A = construct(A, ['a', 'b', 'c']);

    expect(a).toBeInstanceOf(A);
    expect(a.args).toEqual(['a', 'b', 'c']);
    expect(a.foo).toBe('bar');
  });

  if ((class {
  }).toString()[0] !== 'c') {
    it(`should create instance of newTarget and apply target`, () => {
      class A {
        public name: string;

        constructor(public a: number) {
        }
      }

      A.prototype.name = 'bob';

      class B {
        public name: string;

        constructor(public b: number) {
        }
      }

      B.prototype.name = 'alice';

      let a = construct(A, [1]);
      let b = construct(A, [2], B);

      expect(a).toBeInstanceOf(A);
      expect(a.a).toBe(1);
      expect(a.name).toBe('bob');

      expect(b).toBeInstanceOf(B);
      expect(b).not.toBeInstanceOf(A);
      expect((b as any).a).toBe(2);
      expect(b.b).toBeUndefined();
      expect(b.name).toBe('alice');
    });
  }

  it(`should return target apply result if it object`, () => {
    function S() {
      return {foo: 'bar'};
    }

    function N() {
      return 55;
    }

    function P() {
    }

    let s = construct(S, []);
    let sp = construct(S, [], P);
    let n = construct(N, []);
    let np = construct(N, [], P);

    expect(s).toEqual({foo: 'bar'});
    expect(s).not.toBeInstanceOf(S);
    expect(sp).toEqual({foo: 'bar'});
    expect(sp).not.toBeInstanceOf(S);
    expect(sp).not.toBeInstanceOf(P);
    expect(n).toBeInstanceOf(N);
    expect(np).toBeInstanceOf(P);
    expect(np).not.toBeInstanceOf(N);
  });

  it('should create function', async () => {
    let foo = construct(Function, [`bar`, `return bar;`]);
    expect(foo).toBeInstanceOf(Function);
    expect(foo).toBeFunction();
    expect(foo('bar')).toBe('bar');
  });

  if ((async () => {
  }).toString()[0] === 'a') {
    it('should create async function', async () => {
      let AsyncFunction = (async () => {

      }).constructor;
      let foo: any = construct(AsyncFunction, [`bar`, `return bar;`]);
      expect(foo).toBeInstanceOf(Function);
      expect(foo).toBeFunction();

      let result = foo('bar');
      expect(result).toBeInstanceOf(Promise);
      expect(await result).toBe('bar');
    });
  }

  it('should create function with object prototype', () => {
    function Some() {
      throw new TypeError('error');
    }

    let instance = construct(Function, [''], Some);
    expect(instance).toBeInstanceOf(Some);
    expect(instance).not.toBeInstanceOf(Function);
    expect(Object.getPrototypeOf(instance)).toBe(Some.prototype);
    expect(instance).toBeFunction();
  });

  it('should create array object with newTarget proto', () => {
    class A {
      constructor() {
        throw new TypeError('error');
      }

      method() {
      }
    }

    class B extends A {
    }

    let instance = construct(Array, [5], B);

    expect(instance).toBeInstanceOf(A);
    expect(instance).toBeInstanceOf(B);
    expect(instance).not.toBeInstanceOf(Array);
    expect(Array.isArray(instance)).toBeTruthy();
    expect(String(instance)).toBe('[object Array]');
    expect(instance).toHaveLength(5);
    expect(instance.method).toBe(A.prototype.method);
    expect(instance.hasOwnProperty(5)).toBeFalsy();
    instance[5] = 6;
    expect(instance.hasOwnProperty(5)).toBeTruthy();
    expect(instance).toHaveLength(6);

  });

  it('should create string object with newTarget proto', () => {
    function Some() {
    }

    let instance = construct(String, ['foo'], Some);

    expect(instance).toBeInstanceOf(Some);
    expect(instance).not.toBeInstanceOf(String);
    expect(instance).toHaveLength(3);
    expect(String(instance)).toBe('[object String]');
    expect(String.prototype.valueOf.call(instance)).toBe('foo');
  });
});
