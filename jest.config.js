module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  rootDir: '.',
  testRegex: '.*spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports' }]],
  // globalTeardown:
  //   './cdp-data-access-service/cross-cutting/test-utils/teardownHook.ts',
};
