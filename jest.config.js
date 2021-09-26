module.exports = {
  roots: [
    "<rootDir>/test"
  ],
  moduleDirectories: [
    "src",
    "node_modules"
  ],
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy"
  },
  testMatch: [
    "**/*spec.js"
  ],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js"
  ],
  coverageDirectory : "coverage"
};
