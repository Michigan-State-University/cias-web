process.env.TZ = 'UTC';

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@anycable/web|@anycable/core|nanoevents|byte-size).+\\.js$',
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.test.{js,jsx,ts,tsx}',
    '!app/**/messages.{js,ts}',
    '!app/*/RbGenerated*/*.{js,jsx,ts,tsx}',
    '!app/app.js',
    '!app/global-styles.{js,ts}',
    '!app/*/*/Loadable.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {},
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.js',
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/jest.setup.js',
    'jest-extended/all',
  ],
  setupFiles: ['raf/polyfill', 'jest-canvas-mock'],
  testRegex: 'tests/.*\\.test\\.(js|ts)x?$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  snapshotSerializers: [],
  clearMocks: true,
};
