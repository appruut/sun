const { template, deleteFiles } = require("mrm-core");
const { join } = require("path");
const debug = require("debug")("appruut:node-present-github");

class StandardTemplate {
  constructor() {
    this.issues = ".github/ISSUE_TEMPLATE.md";
  }

  /**
   * Create required templates
   *
   * @method up
   *
   * @return {void}
   */
  up() {
    debug("using template: %s", this.issues);
    template(this.issues, join(__dirname, "templates", "issues.md"))
      .apply()
      .save();
  }

  /**
   * Remove previously created template
   *
   * @method down
   *
   * @return {void}
   */
  down() {
    debug("removing template: %s", this.issues);
    deleteFiles(this.issues);
  }
}

module.exports = new StandardTemplate();
