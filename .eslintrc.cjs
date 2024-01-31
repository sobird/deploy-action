module.exports = {
  root: true,
  plugins: [
    'jest',
  ],
  extends: [
    'sobird/typescript.cjs',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',

  },
  // overrides: [
  //   {
  //     files: ['**/*.ts?(x)'],
  //     extends: [
  //       'sobird/typescript-react.cjs',
  //     ],
  //     rules: {
  //       'import/prefer-default-export': 'off',
  //       'import/no-extraneous-dependencies': 'off',
  //       'react/no-unknown-property': 'off',
  //       'no-param-reassign': [
  //         'error',
  //         {
  //           props: true,
  //           ignorePropertyModificationsFor: [
  //             'ctx', // for Koa routing
  //             'req', // for Express requests
  //             'request', // for Express requests
  //             'res', // for Express responses
  //             'response', // for Express responses
  //             'state', // for store state
  //             'model', // for store state
  //           ],
  //         },
  //       ],
  //       'prefer-promise-reject-errors': 'off',
  //     },
  //   },
  // ],
  rules: {
    'import/prefer-default-export': ['off'],
  },
};
