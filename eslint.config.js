// @ts-check

import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';


export default [
	tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended),
	eslintPluginPrettierRecommended,
	{
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
			},
		},
		plugins: {
		},
		rules: {
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off"
		}
	}
];
