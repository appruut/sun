const gitUserName = require("git-user-name");
const gitUserEmail = require("git-user-email");
const createLicense = require("mrm-task-license");

const mergeConfig = require("../utils/mergeConfig");

function task(config) {
  mergeConfig(config, {
    licenseFile: "LICENSE.md",
    name: gitUserName(),
    license: "Unlicensed",
    email: gitUserEmail() || "upruut",
  });
  createLicense(config);
}

task.description = "Add LICENSE.md file";
module.exports = task;
