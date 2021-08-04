const { install, packageJson, ini } = require("mrm-core");

function task() {
  /**
   * Install required dev-dependencies
   */
  install(["np"]);

  const pkgFile = packageJson();

  /**
   * Set npm config
   */
  pkgFile.set("np", {
    contents: ".",
    anyBranch: false,
    publish: false,
    test: false,
    branch: "ruut",
  });

  /**
   * Set release script
   */
  pkgFile.setScript("release", "np");
  pkgFile.setScript("version", "npm run build");

  /**
   * Save the package file
   */
  pkgFile.save();

  /**
   * Create npmrc file to define commit format
   */
  const npmrc = ini(".npmrc");
  npmrc.set("_global", { message: '"chore(release): %s"' });
  npmrc.save({ withSpaces: false });
}

task.description = "Add np for npm package release management";
module.exports = task;
