/// <reference path="../types/color.d.ts" />
import * as fs from 'node:fs';
import * as lightColors from '../src/light';
import * as darkColors from '../src/dark';
import { BaseBackground, BaseColors } from '../src';
import { camelToKebabCase, writeFile } from './utils';

const OUT_DIR = './scss';
const colorVariableBuilder = (colorScale: ColorScale<HexColor>, colorName: string) => {
	const variableEntries: string[] = [];

	const colorScaleName = camelToKebabCase(colorName);

	Object.entries(colorScale)
		.forEach(([colorScaleID, colorScaleValue]) => {
			variableEntries.push(
				`$${colorScaleName}-${colorScaleID}: ${colorScaleValue};`,
			);
		});

	return variableEntries;
};
const CSSVarBuilder = (colorType: 'light' | 'dark') => {
	const colorScale = colorType === 'light'
		? lightColors
		: darkColors;

	Object.entries(colorScale).forEach(([colorName, colorScale]) => {
		const cssVariableEntries: string[] = colorVariableBuilder(colorScale, colorName);
		const comment = `// ${colorName.toUpperCase()} Color Variables`;
		const cssVariableString = `${comment}\n${cssVariableEntries.join('\n')}\n`;
		writeFile(OUT_DIR, `_${colorName}.scss`, cssVariableString);
	});
};

const baseColorCSSBuilder = () => {
	const baseColorEntries: string[] = [];

	Object.entries(BaseColors).forEach(([colorName, colorValue]) => {
		baseColorEntries.push(`$${camelToKebabCase(colorName)}: ${colorValue};`);
	});

	const COMMENT = `// BASE Color Variables`;

	const baseColorString = `${COMMENT} \n${baseColorEntries.join('\n')}\n`;
	const baseLightBackground = `$background: ${BaseBackground.light};\n`;
	const baseDarkBackground = `$background-dark: ${BaseBackground.dark};\n`;

	writeFile(OUT_DIR, 'base.scss', `${baseColorString}\n${baseLightBackground}\n${baseDarkBackground}`);
};

const rootCSSBuilder = (colorType: 'light' | 'dark') => {
	const colorScale = colorType === 'light' ? lightColors : darkColors;
	const cssImports: string[] = [];
	Object.keys(colorScale).forEach((colorName) => {
		cssImports.push(`@import './${colorName}';`);
	});
	writeFile(OUT_DIR, `${colorType}.scss`, cssImports.join('\n'));
};

const run = () => {
	fs.mkdir(OUT_DIR, (err) => {
		if (err) {
			if (err.code !== 'EEXIST')
				console.error(err);
		}
	});
	CSSVarBuilder('light');
	CSSVarBuilder('dark');
	rootCSSBuilder('light');
	rootCSSBuilder('dark');
	baseColorCSSBuilder();
	writeFile(
		OUT_DIR,
		'colors.scss',
		`/* @kevintyj/color/scss */
@import "./light";
@import "./dark";
@import "./base";`,
	);
};

run();
