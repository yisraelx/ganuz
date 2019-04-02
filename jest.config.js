module.exports = {
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  moduleNameMapper: {
    '@ganuz/(.*)': '<rootDir>/modules/$1'
  },
  testMatch: [
    '<rootDir>/modules/**/__tests__/*.ts'
  ],
  coveragePathIgnorePatterns: [
    '/config/'
  ],
  collectCoverage: true,
  coverageReporters: [
    'json',
    'text-summary',
    'html'
  ],
  globals: {
    'ts-jest': {
      tsConfig: {target: process.env.TS_TARGET || 'es5'}
    }
  }
};
