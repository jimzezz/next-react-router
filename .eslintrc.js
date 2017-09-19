module.exports = {
  extends: ['airbnb', 'standard', 'standard-react', 'plugin:flowtype/recommended'],
  parser: 'babel-eslint',
  plugins: ['react', 'jsx-a11y', 'import', 'flowtype'],
  rules: {
    'no-console': 1,
    'comma-dangle': ['error', 'always-multiline'],
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-multi-assign': 0,
    'global-require': 0
  },
  env: {
    browser: true,
    node: true
  }
}
