import { defineConfig } from 'tsup';

export default defineConfig({
	entry: [
		'src/index.ts',
		'src/light.ts',
		'src/dark.ts',
	],
	format: ['cjs', 'esm'],
	dts: {
		banner: `/// <reference path="../types/color.d.ts" />`,
	},
	clean: true,
	treeshake: true,
});
