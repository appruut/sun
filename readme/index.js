const path = require("path");
const { template, packageJson } = require("mrm-core");
const gitUserName = require("git-user-name");

const gh = require("../utils/ghAttributes");
const Services = require("../utils/Services");
const saveFile = require("../utils/saveFile");
const mergeConfig = require("../utils/mergeConfig");

function task(config) {
  const ghAttributes = gh("creating README.md file");

  mergeConfig(config, {
    packageName: packageJson().get("name") || "Anonymous",
    packageDescription: packageJson().get("description") || "Tagline",
    repoName: ghAttributes.name,
    owner: ghAttributes.owner,
    ghUsername: gitUserName(),
    force: false,
    appveyorUsername: ghAttributes.owner,
  });

  const servicesList = config.services || [];

  /**
   * Adding npm, license and typescript services
   */
  servicesList.push("npm", "license", "typescript");

  const services = new Services(servicesList, {
    owner: config.owner,
    appveyorUsername: config.appveyorUsername,
    repoName: config.repoName,
    packageName: config.packageName,
  });

  const templateFile = config.core ? "README_CORE.md" : "README.md";
  const readme = template(
    "README.md",
    path.join(__dirname, "templates", templateFile)
  );
  let banner = "";

  /**
   * appruut banner
   */
  if (config.packageName.startsWith("@appruut")) {
    banner =
      '<div align="center"><img src="https://res.cloudinary.com/appruut/image/upload/v1626634058/appruut/appruut.jpg" width="100px" height="100px"></div>';
  }

  const badges = services.getReferences();

  readme.apply(
    Object.assign(
      {
        servicesUrls: services.getUrls(),
        servicesBadges: badges,
        banner: banner,
      },
      config
    )
  );

  /**
   * Create readme file
   */
  saveFile(readme, config.force);
}

task.description = "Add README.md file";

module.exports = task;
