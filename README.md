<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
'**Contents**'

- [Appruut Sun - "SEERN" Present for Node.js](#appruut-sun---seern-present-for-nodejs)
  - [Appveyor](#appveyor)
  - [Circleci](#circleci)
  - [Contributor's List](#contributors-list)
  - [Editor Config File](#editor-config-file)
  - [Application Linting with eslint](#application-linting-with-eslint)
  - [GitHub templates](#github-templates)
  - [GitHub Actions](#github-actions)
  - [Application git check .gitignore](#application-git-check-gitignore)
  - [GitHub Labels](#github-labels)
  - [Application Licensing](#application-licensing)
  - [Package release management](#package-release-management)
  - [Package.json](#packagejson)
  - [Package security](#package-security)
  - [Prettier config](#prettier-config)
  - [Probots](#probots)
  - [Readme file](#readme-file)
  - [TOC](#toc)
  - [Validate Commits](#validate-commits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<div align="center">
<h2>Appruut Sun - "SEERN" Present for Node.js</h2>
<p>
<i>
    Pronounced as 'SERRNN' - SQL, Express Js, React Js, React Native and Node Js Presets. (TypeORM, TypeScript)
<i>
</p>
</div>
<p align="center">
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black" alt="Javascript" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="Node.js" />&nbsp;&nbsp;
</p>
<!-- TASKS START -->
<!-- DO NOT MODIFY MANUALLY. INSTEAD RUN `npm run docs` TO REGENERATE IT -->

### Appveyor

Add `appveyor.yml` file

### Circleci

Add `.circleci/config.yml` file

### Contributor's List

Creates `.github/CONTRIBUTING.md` file


### Editor Config File

Add `.editorconfig` file

### Application Linting with eslint

Add `.eslintrc.json` & `.eslintignore` files.
Installs `eslint` and `@appruut/eslint-plugin` npm packages.


### GitHub templates

Add Github related templates

### GitHub Actions

Add `.github/workflows/test.yml` file

### Application git check .gitignore

Add `.gitignore` file.
Defaults to the `Node.js` .gitignore recommendations

### GitHub Labels

Add a script to sync labels with Github

### Application Licensing

Add `LICENSE.md` file.
Defaults to `MIT`


### Package release management

Add `np` for npm package release management.
Create `.npmrc`

### Package.json

Add `package.json `file and `configures/installs` dependencies

### Package security

Add `"publishConfig"` to `package.json` depending on the type of organization you are in. Defaults to `"public"`.

<pre>
<code>
"publishConfig": {
    "access": "public" or "restricted"
  }
</code>
</pre>


### Prettier config

Add `prettier` files `.prettierignore`and `.prettierrc` to the project

### Probots

Configure certain probot applications



### Readme file

Add `README.md`

### TOC

Generate `TOC` for `readme.md` file




### Validate Commits

Enforce commit message convention

<!-- TASKS END -->