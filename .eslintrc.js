/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['src/_generated_/*.ts'], // adjust path if needed
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};