module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jsx: true
  },
  "plugins": ["solid"],
  "extends": ['standard-with-typescript', "eslint:recommended", "plugin:solid/recommended"],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}