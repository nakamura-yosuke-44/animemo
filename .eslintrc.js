module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb',
      'plugin:tailwindcss/recommended',
    ],
    plugins: [
    'tailwindcss',
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [
          '.eslintrc.{js,cjs}',
        ],
        parserOptions: {
          sourceType: 'script',
        },
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-plusplus': 'warn',
      'react/jsx-props-no-spreading': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'no-inner-declarations': 'warn',
      'import/prefer-default-export': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'react/require-default-props': 'off',
      'jsx-a11y/label-has-associated-control': ['error', {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'either',
        depth: 25
      }],
    }
  };
  