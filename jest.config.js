const esModules = ['@ionic'].join('|');

module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${esModules})`
  ],
};
