import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: {
		banner: `/// <reference path="../types/color.d.ts" />`,
	},
	clean: true,
	treeshake: true,
});
