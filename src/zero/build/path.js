'use strict';

const path = require('path');
const pathSep = require('path').sep;
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const buildPath = 'dest';

module.exports = {
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  getModulelId: resolveApp(
    `src${pathSep}zero${pathSep}build${pathSep}getModulelId`
  ),
  platformDep: resolveApp('platformDep.js'),
  platformNameMap: resolveApp(`${buildPath}${pathSep}platformNameMap.json`),
};
