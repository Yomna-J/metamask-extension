const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const VERSION = require('../package.json').version;

start().catch(console.error);

async function start() {
  let betaVersion;
  if (VERSION.includes('beta')) {
    const splitVersion = VERSION.split('-beta.');
    const currentBetaVersion = Number(splitVersion[1]) + 1;
    betaVersion = `${splitVersion[0]}-beta.${currentBetaVersion}`;
    // Remove auto generated stableVersion an , after packageManager line to achieve bump
    // You can find the issue here: https://github.com/yarnpkg/berry/issues/4328
    await exec(
      "sed -i '' '/stableVersion/d' package.json && sed -i '' '/packageManage/ s/,$//' package.json",
    );

    // bump existing beta version
    await exec(`yarn version ${betaVersion}`);
  } else {
    betaVersion = `${VERSION}-beta.0`;
    // change package.json version to beta
    await exec(`yarn version ${betaVersion}`);
  }
  // Generate a beta commit message and push changes to github
  // Later on this will be picked up by cicleCI
  // await exec(
  //   `git add . && git commit -m "Version v${betaVersion}" && git push`,
  // );
}
