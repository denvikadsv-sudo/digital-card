module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  setupFiles: ['<rootDir>/test/setup-env.js'],
  testRegex: '.*\\.(spec|e2e-spec)\\.ts$',
};
