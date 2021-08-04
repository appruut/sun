const { template, deleteFiles } = require("mrm-core");
const { join } = require("path");
const debug = require("debug")("appruut:node-preset-github");

class CoreTemplates {
  constructor() {
    this.issues = ".github/ISSUE_TEMPLATE/bug_report.md";
    this.features = ".github/ISSUE_TEMPLATE/feature_request.md";
  }

  /**
   * Create required templates
   *
   * @method up
   *
   * @return {void}
   */
  up() {
    debug("using templates: %o", [this.issues, this.features]);

    template(this.issues, join(__dirname, "templates", "bugs.md"))
      .apply()
      .save();
    template(this.features, join(__dirname, "templates", "features.md"))
      .apply()
      .save();
  }

  /**
   * Remove previously created templates
   *
   * @method down
   *
   * @return {void}
   */
  down() {
    debug("removing templates: %o", [this.issues, this.features]);

    deleteFiles([this.issues, this.features]);
  }
}

module.exports = new CoreTemplates();
