const path = require("path");
const deepExtend = require("deep-extend");

module.exports = function (config, defaults) {
  try {
    const projectConfigFile = require(path.join(process.cwd(), "config.json"));
    deepExtend(config, defaults, projectConfigFile || {});
  } catch (error) {
    // ignore
  }
};
