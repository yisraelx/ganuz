import scope from '../';

describe(`scope()`, () => {
  it(`should be a function`, () => {
    expect(scope).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => scope('some', null)).toThrow();
    expect(() => scope('some')(55 as any)).toThrow();
    expect(() => scope()(true as any)).toThrow();
  });

  it('should create scope getter by target function', () => {
    expect(scope('some')).toBeFunction();
    expect(scope(77)).toBeFunction();
    expect(scope()).toBeFunction();
    expect(scope(undefined)).toBeFunction();
    expect(scope(null)).toBeFunction();
  });

  it('should get scope by id and target', () => {
    let target = {};
    let $scope = scope('some', target);

    expect($scope).toBeObject();
    expect(scope('some', target)).toBe($scope);
    expect(scope('some')(target)).toBe($scope);
  });

  it('should create scope for each target', () => {
    let a = {};
    let b = {};
    let c = {};
    let $ = scope();

    expect($(a)).toBeObject();
    expect($(a)).toBe($(a));
    expect($(b)).toBeObject();
    expect($(b)).toBe($(b));
    expect($(c)).toBeObject();
    expect($(c)).toBe(scope()(c));
    expect($(a)).not.toBe($(b));
    expect($(b)).not.toBe($(c));
    expect($(c)).not.toBe($(a));
  });

  it('should create multiple scope in one target', () => {
    let target = {};
    let $scope = scope()(target);
    let $scope_a = scope('a', target);
    let $scope_b = scope('b')(target);

    expect(scope()(target)).toBe($scope);
    expect(scope('a')(target)).toBe($scope_a);
    expect(scope('b', target)).toBe($scope_b);
    expect($scope).not.toBe($scope_a);
    expect($scope_a).not.toBe($scope_b);
  });
});
