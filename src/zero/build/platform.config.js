const pathSep = require('path').sep;
const fs = require('fs');
const getModuleId = require('./getModulelId').getModuleId;
const useIndex = require('./getModulelId').useIndex;
const paths = require('./path');
let entry = `${paths.appPath}${pathSep}platformDep.js`; //打包的入口，保证UI打包和命令行打包使用同一个入口名称
const platformMapPath = `${paths.appBuild}${pathSep}platformNameMap.json`;

function createModuleIdFactory() {
  // const projectRootPath = __dirname; //获取当前目录，__dirname是nodejs提供的变量
  return (path) => {
    let name = getModuleId(paths.appPath, path, entry, false);
    if (useIndex !== true) {
      //存储基础包的js模块名，只在使用模块名打包时有用，使用递增序列时直接判断数字是否小于100000来判断是否时基础包
      const platfromNameArray = require(platformMapPath);
      if (!platfromNameArray.includes(name)) {
        platfromNameArray.push(name);
        fs.writeFileSync(platformMapPath, JSON.stringify(platfromNameArray));
      }
    }
    return name;
  };
}

module.exports = {
  serializer: {
    createModuleIdFactory: createModuleIdFactory,
    /* serializer options */
  },
};
