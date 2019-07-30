module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  plugins: [
    'jest',
  ],
  extends: [
    '@antfu/eslint-config-ts',
  ],
  rules: {}
}
