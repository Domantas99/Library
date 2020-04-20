module.exports = {
  linters: {
    "**/*.+(js|jsx|md|ts|css|sass|less|graphql|yml|yaml|json)": [
      "eslint --fix",
      "prettier --write",
      // "jest --findRelatedTests",
      "git add",
    ],
  },
};
