/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  runner: '@kayahr/jest-electron-runner/main',
  testEnvironment: 'node',
  testTimeout: 10000,
  testMatch: ['<rootDir>/test/**/*.test.ts'],
};
