const { template, deleteFiles } = require("mrm-core");
const { join } = require("path");
const debug = require("debug")("appruut:node-probot");

/**
 * Creates the `.github/stale.yml` file
 */
class StaleTemplate {
  constructor() {
    this.template = ".github/stale.yml";
    this.message =
      "Make sure to also install https://probot.github.io/apps/stale app.";
  }

  /**
   * Create required templates
   *
   * @method up
   *
   * @return {void}
   */
  up() {
    debug("using template: %s", this.template);
    template(this.template, join(__dirname, "templates", "stale.yml"))
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
    debug("removing template: %s", this.template);
    deleteFiles([this.template]);
  }
}

module.exports = new StaleTemplate();
