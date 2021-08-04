const { packageJson } = require("mrm-core");

function task(config) {
  const pkgFile = packageJson();
  /**
   * Set publish to public
   */

  pkgFile.set("publishConfig", {
    access: config.private ? "restricted" : "public",
  });

  /**
   * Save the package file
   */
  pkgFile.save();
}

task.description = "Add publishConfig for npm package privacy";
module.exports = task;
