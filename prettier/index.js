const { json, install, packageJson, lines } = require("mrm-core");

function task(config) {
  /**
   * Add prettier file
   */
  const prettierRc = json(".prettierrc");
  prettierRc.set({
    trailingComma: "es5",
    semi: true,
    useTabs: false,
    quoteProps: "consistent",
    bracketSpacing: true,
    arrowParens: "always",
    printWidth: 100,
  });
  prettierRc.save();

  /**
   * Update package file
   */
  const pkgFile = packageJson();
  pkgFile.setScript("format", "prettier --write .");
  pkgFile.save();

  /**
   * Add .prettierignore file
   */
  const outDir = config.outDir ? config.outDir : "dist";
  const prettierIgnore = lines(".prettierignore");
  prettierIgnore.add(`${outDir}`);
  prettierIgnore.add("docs");
  prettierIgnore.add("*.md");
  prettierIgnore.add("config.json");
  prettierIgnore.add(".eslintrc.json");
  prettierIgnore.add("package.json");
  prettierIgnore.add("*.html");
  prettierIgnore.add("*.txt");
  prettierIgnore.save();

  /**
   * Update eslintrc.json file to use prettier
   */
  const eslintRc = json(".eslintrc.json");

  /**
   * Update if file exists, otherwise ignore
   */
  if (eslintRc.exists()) {
    eslintRc.merge({ extends: ["prettier"] });
    eslintRc.merge({ plugins: ["prettier"] });
    eslintRc.set("rules.prettier/prettier", ["error", { endOfLine: "auto" }]);
    eslintRc.save();
  }

  const plugins = ["prettier"];

  /**
   * Only install when using eslint
   */
  if (eslintRc.exists()) {
    plugins.push("eslint-plugin-prettier");
    plugins.push("eslint-config-prettier");
  }

  /**
   * Install required dependencies
   */
  install(plugins);
}

task.description = "Add prettier to the project";
module.exports = task;
