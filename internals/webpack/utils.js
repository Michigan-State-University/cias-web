const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

const onHeroku = process.env.SOURCE_VERSION || process.env.DOKKU_APP_TYPE;

const getCommitHash = () =>
  process.env.SOURCE_VERSION ||
  process.env.GIT_REV ||
  gitRevisionPlugin.commithash();

// One Sentry release per deploy: the release tag in Docker, the commit elsewhere.
const getSentryRelease = () => `${process.env.SENTRY_ENV}-${getCommitHash()}`;

exports.gitRevisionPlugin = gitRevisionPlugin;
exports.onHeroku = onHeroku;
exports.getCommitHash = getCommitHash;
exports.getSentryRelease = getSentryRelease;
