const stale = require("./stale");
const lock = require("./lock");
const mergeConfig = require("../utils/mergeConfig");

/**
 * Configuring probot apps
 *
 * @method task
 *
 * @param  {Object} config
 *
 * @return {void}
 */
function task(config) {
  mergeConfig(config, {
    probotApps: [],
  });

  if (config.probotApps.includes("stale")) {
    stale.up();
  } else {
    stale.down();
  }

  if (config.probotApps.includes("lock")) {
    lock.up();
  } else {
    lock.down();
  }
}

task.description = "Configure certain probot applications";
module.exports = task;
