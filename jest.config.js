module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["lib/**/*.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
