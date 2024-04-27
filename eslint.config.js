import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier,
    },
    rules: {
      'no-var': 2,
      semi: 2,
      'prettier/prettier': 1,
    },
    ignores: ['dist/**', 'node_modules/**'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
];
