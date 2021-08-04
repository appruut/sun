const { template } = require("mrm-core");
const { join } = require("path");

const gh = require("../utils/ghAttributes");
const mergeConfig = require("../utils/mergeConfig");
const core = require("./core");
const standard = require("./standard");

const prTemplate = ".github/PULL_REQUEST_TEMPLATE.md";

/**
 * Creating required github templates
 *
 * @method task
 *
 * @param  {Object} config
 *
 * @return {void}
 */
function task(config) {
  const ghAttributes = gh("creating github templates");
  mergeConfig(config, { repo: ghAttributes.repo });

  if (config.core) {
    core.up();
    standard.down();
  } else {
    standard.up();
    core.down();
  }

  template(prTemplate, join(__dirname, "templates", "pr.md"))
    .apply(ghAttributes)
    .save();
}

task.description = "Add Github related templates";
module.exports = task;
