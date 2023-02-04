const BRANCH_REGEX =
  /^main|develop|(ci|chore|docs|feat|fix|perf|refactor|revert|style)\/\d*(?:[-](?![-])\w*)*$/;

const ERROR_MSG =
  'This branch name does not follow our conventions.' +
  '\n' +
  'Rename it with "git branch -m <current-name> <new-name>"' +
  '\n' +
  'Here are some example branch names that are accepted: "fix/123-description", "feat/123-longer-description", "chore/123", "main", "develop".';

module.exports = { pattern: BRANCH_REGEX, errorMsg: ERROR_MSG };
