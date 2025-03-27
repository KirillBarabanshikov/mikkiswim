module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended', 'prettier'],
  env: {
    browser: true,
    node: true
  },
  plugins: ['simple-import-sort'],
  rules: {
    'no-console': 'off',
    quotes: ['error', 'single'],
    'prefer-const': 'error',
    'comma-dangle': ['error', 'only-multiline'],
    semi: 'off',
    'no-duplicate-imports': 'error',
    'no-template-curly-in-string': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    camelcase: ['error'],
    'func-style': ['error', 'expression'],
    'max-depth': ['error', 3],
    'no-alert': ['error'],
    'no-var': ['error'],
    'vue/no-v-html': 'off',
    ident: 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/attributes-order': 'off',
    'vue/multi-word-component-names': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
}
