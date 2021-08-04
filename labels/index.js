const { install, packageJson } = require("mrm-core");
const gh = require("../utils/ghAttributes");
const mergeConfig = require("../utils/mergeConfig");

function task(config) {
  const ghAttributes = gh("syncing github labels");
  mergeConfig(config, { repo: ghAttributes.repo });

  /**
   * Update package file
   */
  const pkgFile = packageJson();
  pkgFile
    .setScript(
      "sync-labels",
      `github-label-sync --labels ./node_modules/@appruut/node-preset/gh-labels.json ${config.repo}`
    )
    .save();

  /**
   * Install required dependencies
   */
  install(["github-label-sync"]);
}

task.description = "Add a script to sync labels with Github";
module.exports = task;
