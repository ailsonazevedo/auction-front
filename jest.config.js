const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: [
    "json",
    "html",
    "lcov",
    "text",
    ["text", { skipFull: true }],
  ],
  coverageThreshold: {
    global: {
      branches: 55, // Todo: mudar para > 70
      functions: 45, // Todo: mudar para > 70
      lines: 75,
      statements: 75,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^jose$": "<rootDir>/__mocks__/jose.js",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testTimeout: 20000,
  verbose: true,
};

module.exports = createJestConfig(config);
