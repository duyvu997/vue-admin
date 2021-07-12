module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: ["./src/api/", "src/utils/cookies.ts", "src/utils/request.ts"],
  coverageThreshold: {
    "global": {
      "branches": 10,
      "functions": 10,
      "lines": 10,
      "statements": 10
    }
  }
}
