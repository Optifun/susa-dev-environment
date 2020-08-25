module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/.docz/'],
  // transformIgnorePatterns: ['/\.(scss|sass)/'],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg|ttf)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|sass|scss)$": "identity-obj-proxy"
  }
}
