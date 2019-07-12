module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  }
};