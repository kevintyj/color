import antfu from '@antfu/eslint-config';

/* Using custom configuration of Antfu's code style: https://github.com/antfu/eslint-config */
export default antfu(
	{
		typescript: {
			tsconfigPath: 'tsconfig.json',
		},
		stylistic: {
			indent: 'tab',
			quotes: 'single',
		},
		ignores: [
			'dist',
			'.idea',
			'README.md',
		],
	},
	{
		files: ['tsconfig.json', 'package.json'],
		rules: {
			'jsonc/sort-keys': 'off',
		},
	},
	{
		rules: {
			'style/semi': ['error', 'always'],
		},

	},
);
