module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': 0,
    'indent': 0,
    'no-unreachable': 0,
    'padded-blocks': 0,
    'no-useless-escape': 0,
    'no-unused-vars': 0
  },
  globals: {}
}
