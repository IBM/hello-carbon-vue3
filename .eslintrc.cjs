/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier-vue/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
