export function requireWithoutGlobal(globalPath: string, modulePath: string) {
  let [contextName, targetName] = (globalPath.indexOf('.') > -1 ? globalPath : `this.${ globalPath }`).split('.');
  let context: any = (new Function(`return ${ contextName };`))() || {};
  let globalValue = context[targetName];
  if (globalValue) {
    delete context[targetName];
    jest.resetModules();
  }
  let module = require(modulePath);
  if (globalValue) {
    context[targetName] = globalValue;
  }
  return module;
}

export function describeGlobalPatch<TTarget>(name: string, globalPath: string, modulePath: string, callback: (target: TTarget) => void): void {
  let {default: original} = require(modulePath);
  let {default: patch} = requireWithoutGlobal(globalPath, modulePath);
  describePatch(name, original !== patch && original, patch, callback);
}

export function describePatch<TTarget extends any>(name: string, original: TTarget, patch: TTarget, callback: (target: TTarget) => void): void {
  describeForEach(name, {original, patch}, callback);
}

export function describeForEach<TTarget extends any>(name: string, targets: {[label: string]: TTarget}, callback: (target: TTarget) => void): void {
  describe(name, () => {
    Object.keys(targets).forEach((label: string) => {
      let target: TTarget = targets[label];
      if (!target) {
        return;
      }
      describe(label, () => {
        callback(target);
      });
    });
  });
}
