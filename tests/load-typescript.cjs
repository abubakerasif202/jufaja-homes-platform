const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();

module.exports = function loadSource(relative, overrides = {}) {
  const filename = path.resolve(root, relative);
  if (cache.has(filename) && !Object.keys(overrides).length) return cache.get(filename);
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const nodeRequire = loaded.require.bind(loaded);
  loaded.require = name => {
    if (name in overrides) return overrides[name];
    if (name.startsWith('@/') || name.startsWith('.')) {
      const resolved = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(path.dirname(filename), name);
      if (fs.existsSync(`${resolved}.ts`)) return module.exports(path.relative(root, `${resolved}.ts`), overrides);
      if (fs.existsSync(resolved)) return nodeRequire(resolved);
    }
    return nodeRequire(name);
  };
  loaded._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, filename);
  if (!Object.keys(overrides).length) cache.set(filename, loaded.exports);
  return loaded.exports;
};
