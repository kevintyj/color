/// <reference path="../types/color.d.ts" />
import * as lightColors from '../src/light';
import * as darkColors from '../src/dark';
import { writeFile } from './utils';

const CSS_LIGHT_SELECTOR = ':root, .light, .light-theme';
const CSS_DARK_SELECTOR = '.dark, .dark-theme';
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
		writeFile('dist', `${colorName}.css`, cssVariableString);
	});
};

const rootCSSBuilder = (colorType: 'light' | 'dark') => {
	const colorScale = colorType === 'light' ? lightColors : darkColors;
	const cssImports: string[] = [];
	Object.keys(colorScale).forEach((colorName) => {
		cssImports.push(`@import './${colorName}.css';`);
	});
	writeFile('dist', 'light.css', cssImports.join('\n'));
};

const run = () => {
	CSSVarBuilder('light');
	CSSVarBuilder('dark');
	rootCSSBuilder('light');
	rootCSSBuilder('dark');
	writeFile(
		'css',
		'colors.css',
		`@import "./light.css";
		@import "./dark.css";`,
	);
};

run();
