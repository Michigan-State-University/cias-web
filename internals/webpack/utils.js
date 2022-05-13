const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

const onHeroku = !!process.env.SOURCE_VERSION;

const getCommitHash = () =>
  process.env.SOURCE_VERSION ||
  process.env.GIT_REV ||
  gitRevisionPlugin.commithash();

exports.gitRevisionPlugin = gitRevisionPlugin;
exports.onHeroku = onHeroku;
exports.getCommitHash = getCommitHash;
