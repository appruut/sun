const { lines } = require("mrm-core");
const debug = require("debug")("appruut:preset-gitignore");

/**
 * Create `.gitignore` file
 * @return {void}
 */
function task(config) {
  const outDir = config.outDir ? config.outDir : "dist";
  const file = lines(".gitignore");
  const linesToWrite = [
    "test/__app",
    ".DS_STORE",
    ".idea",
    ".vscode/",
    "*.sublime-project",
    "*.sublime-workspace",
    "build",
    `${outDir}`,
    "dist",
    "shrinkwrap.yaml",
    "logs",
    "*.log",
    "npm-debug.log*",
    "yarn-debug.log*",
    "yarn-error.log*",
    "lerna-debug.log*",
    "report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json",
    "pids",
    "*.pid",
    "*.seed",
    "*.pid.lock",
    "lib-cov",
    "coverage",
    "*.lcov",
    ".nyc_output",
    ".grunt",
    "bower_components",
    ".lock-wscript",
    "build/Release",
    "node_modules/",
    "jspm_packages/",
    "package-lock.json",
    "yarn.lock",
    "typings/",
    "*.tsbuildinfo",
    ".npm",
    ".eslintcache",
    ".rpt2_cache/",
    ".rts2_cache_cjs/",
    ".rts2_cache_es/",
    ".rts2_cache_umd/",
    ".node_repl_history",
    "*.tgz",
    ".yarn-integrity",
    ".env",
    ".env.test",
    ".cache",
    ".next",
    ".nuxt",
    "dist",
    ".cache/",
    ".vuepress/dist",
    ".serverless/",
    ".fusebox/",
    ".dynamodb/",
    ".tern-port",
  ];

  debug(".gitignore %o", linesToWrite);

  file.add(linesToWrite);
  file.save();
}

task.description = "Add .gitignore file";
module.exports = task;
