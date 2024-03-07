module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(js|jsx|tsx)$": "babel-jest",
    "^.+\\.(ts)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node"
};
