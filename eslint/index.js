const { json, install, packageJson, lines } = require("mrm-core");

function task(config) {
  /**
   * Add eslintrc file
   */
  const eslintRc = json(".eslintrc.json");
  eslintRc.set({ extends: ["plugin:@appruut/eslint-plugin/recommended"] });
  eslintRc.save();

  /**
   * Update package file
   */
  const pkgFile = packageJson();
  pkgFile.setScript("lint", "eslint . --ext=.ts");
  pkgFile.save();

  /**
   * Add .eslintignore file
   */
  const outDir = config.outDir ? config.outDir : "dist";
  const eslintIgnore = lines(".eslintignore");
  eslintIgnore.add(`${outDir}`);
  eslintIgnore.save();

  /**
   * Install required dependencies
   */
  install(["eslint", "@appruut/eslint-plugin"]);
}

task.description = "Add eslint and @appruut/eslint-plugin to the project";
module.exports = task;
