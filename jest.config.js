module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
  ],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  }
};
