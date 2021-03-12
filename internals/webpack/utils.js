const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

const onHeroku = process.env.SOURCE_VERSION && process.env.STACK;

const getCommitHash = () =>
  onHeroku ? process.env.SOURCE_VERSION : gitRevisionPlugin.commithash();

exports.gitRevisionPlugin = gitRevisionPlugin;
exports.onHeroku = onHeroku;
exports.getCommitHash = getCommitHash;
