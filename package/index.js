const { packageJson, file } = require("mrm-core");
const { execSync } = require("child_process");

const TSCPreset = require("./tsc-preset");
const mergeConfig = require("../utils/mergeConfig");
const buildJapaFile = require("../utils/buildJapaFile");

const baseDependencies = ["japa"];

function task(config) {
  mergeConfig(config, { services: [], license: "UNLICENSED" });

  /**
   * Create package.json file, if missing
   */
  const initialPkgFile = packageJson();
  if (!initialPkgFile.exists()) {
    execSync("npm init --yes");
  }

  TSCPreset.install(baseDependencies);

  const pkgFile = packageJson();

  /**
   * Below are common scripts for both Typescript and Javascript
   * projects.
   */
  pkgFile.setScript("mrm", "mrm --preset=@appruut/node-preset");
  pkgFile.setScript("test", "node japaFile.js");
  pkgFile.setScript("pretest", "npm run lint");
  pkgFile.set("license", config.license);

  TSCPreset.up(pkgFile, config);

  /**
   * Save the package file
   */
  pkgFile.save();

  /**
   * Create japaFile.js
   */
  const japaFile = file("japaFile.js");
  japaFile.save(buildJapaFile(japaFile.get(), config.ts));
}

task.description = "Add package.json file and configures/installs dependencies";
module.exports = task;
