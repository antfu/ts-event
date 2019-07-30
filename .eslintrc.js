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
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
  }
}
