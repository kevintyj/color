/// <reference path="../types/color.d.ts" />
import * as fs from 'node:fs';
import * as lightColors from '../src/light';
import * as darkColors from '../src/dark';
import { BaseBackground, BaseColors } from '../src';
import { writeFile } from './utils';

const CSS_LIGHT_SELECTOR = ':root, .light, .light-theme';
const CSS_DARK_SELECTOR = '.dark, .dark-theme';
const OUT_DIR = './css';
const colorVariableBuilder = (colorScale: ColorScale<HexColor>, colorName: string) => {
	const variableEntries: string[] = [];

	const colorScaleName = colorName.endsWith('Dark') ? colorName.slice(0, -4) : colorName;
	Object.entries(colorScale)
		.forEach(([colorScaleID, colorScaleValue]) => {
			variableEntries.push(
				`	--${colorScaleName}-${colorScaleID}: ${colorScaleValue};`,
			);
		});

	return variableEntries;
};
const CSSVarBuilder = (colorType: 'light' | 'dark') => {
	const [selector, colorScale] = colorType === 'light'
		? [CSS_LIGHT_SELECTOR, lightColors]
		: [CSS_DARK_SELECTOR, darkColors];

	Object.entries(colorScale).forEach(([colorName, colorScale]) => {
		const cssVariableEntries: string[] = colorVariableBuilder(colorScale, colorName);
		const cssVariableString = `${selector} {\n${cssVariableEntries.join('\n')}\n}`;
		writeFile(OUT_DIR, `${colorName}.css`, cssVariableString);
	});
};

const baseColorCSSBuilder = () => {
	const baseColorEntries: string[] = [];

	Object.entries(BaseColors).forEach(([colorName, colorValue]) => {
		baseColorEntries.push(`	--${colorName}: ${colorValue};`);
	});

	const baseColorString = `:root {\n${baseColorEntries.join('\n')}\n}`;
	const baseLightBackground = `${CSS_LIGHT_SELECTOR} {\n	--background: ${BaseBackground.light};\n}`;
	const baseDarkBackground = `${CSS_DARK_SELECTOR} {\n	--background: ${BaseBackground.dark};\n}`;

	writeFile(OUT_DIR, 'base.css', `${baseColorString}\n${baseLightBackground}\n${baseDarkBackground}`);
};

const rootCSSBuilder = (colorType: 'light' | 'dark') => {
	const colorScale = colorType === 'light' ? lightColors : darkColors;
	const cssImports: string[] = [];
	Object.keys(colorScale).forEach((colorName) => {
		cssImports.push(`@import './${colorName}.css';`);
	});
	writeFile(OUT_DIR, `${colorType}.css`, cssImports.join('\n'));
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
		'css',
		'colors.css',
		`/* @kevintyj/color/css */
@import "./light.css";
@import "./dark.css";
@import "./base.css";`,
	);
};

run();
