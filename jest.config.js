module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  testURL: 'http://localhost',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/test/__mocks__/svgMock.js'
  },
  moduleDirectories: ['node_modules', 'src'],
};
