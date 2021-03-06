const { yaml, deleteFiles } = require("mrm-core");
const mergeConfig = require("../utils/mergeConfig");

function getJobsPayload(os, nodeVersions) {
  return {
    "runs-on": os,
    strategy: {
      matrix: {
        "node-version": [].concat(nodeVersions),
      },
    },
    steps: [
      {
        uses: "actions/checkout@v2",
      },
      {
        name: "Use Node.js ${{ matrix.node-version }}",
        uses: "actions/setup-node@v1",
        with: {
          "node-version": "${{ matrix.node-version }}",
        },
      },
      {
        name: "Install",
        run: "npm install",
      },
      {
        name: "Run tests",
        run: "npm test",
      },
    ],
  };
}

function task(config) {
  mergeConfig(config, {
    services: ["github-actions"],
    minNodeVersion: "latest",
    core: false,
  });

  const hasGithubActions = config.services.indexOf("github-actions") > -1;
  if (!hasGithubActions) {
    deleteFiles([".github/workflows/test.yml"]);
    return;
  }

  /**
   * Versions to test against. Github actions doesn't allow
   * "latest" keyword as of now
   */
  const versions =
    config.minNodeVersion === "latest"
      ? ["16.x"]
      : [config.minNodeVersion, "16.x"];

  const githubActionsFile = yaml(".github/workflows/test.yml");
  githubActionsFile.set("name", "test");
  githubActionsFile.set("on", ["push", "pull_request"]);

  /**
   * Define build for each nodejs version. Later we will use workflows to
   * run each version
   */
  const jobs = {
    linux: getJobsPayload("ubuntu-latest", versions),
    ...(config.runGhActionsOnWindows
      ? { windows: getJobsPayload("windows-latest", versions) }
      : {}),
  };

  githubActionsFile.set("jobs", jobs);
  githubActionsFile.save();
}

task.description = "Add .github/workflows/test.yml file";
module.exports = task;
