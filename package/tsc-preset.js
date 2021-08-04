const { json, install, uninstall } = require("mrm-core");
const debug = require("debug")("appruut:preset-package");

class TSCPreset {
  constructor() {
    this.dependencies = [
      "typescript",
      "@types/node",
      "@adonisjs/require-ts",
      "del-cli",
    ];
  }

  /**
   * Installing dependencies for a Typescript project
   *
   * @method install
   *
   * @param  {Array} baseDependencies
   *
   * @return {void}
   */
  install(baseDependencies) {
    const dependencies = baseDependencies.concat(this.dependencies);

    debug("installing dependencies %o", dependencies);
    install(dependencies);
  }

  /**
   * Removing dependencies for a Typescript project
   *
   * @method uninstall
   *
   * @return {void}
   */
  uninstall() {
    debug("removing dependencies %o", this.dependencies);
    uninstall(this.dependencies);
  }

  /**
   * Mutating the package file for a typescript project
   *
   * @method up
   *
   * @param  {Object}  pkgFile
   * @param {Object} config
   *
   * @return {void}
   */
  up(pkgFile, config) {
    const outDirt = config.outDir ? config.outDir : "dist";

    pkgFile.setScript("clean", `del-cli ${outDirt}`);
    pkgFile.setScript("compile", "npm run lint && npm run clean && tsc");
    pkgFile.setScript("build", "npm run compile");
    pkgFile.setScript("prepublishOnly", "npm run build");

    /**
     * Set files to publish along with the main file
     */
    if (!pkgFile.get("main")) {
      pkgFile.set("main", `${outDirt}/index.js`);
    }

    if (!pkgFile.get("files")) {
      pkgFile.set("files", [
        `${outDirt}/src`,
        `${outDirt}/index.d.ts`,
        `${outDirt}/index.js`,
      ]);
    }

    debug("creating files %o", ["tsconfig.json"]);
    json("tsconfig.json")
      .merge({ extends: "@appruut/node-preset/_tsconfig" })
      .save();
  }
}

module.exports = new TSCPreset();
