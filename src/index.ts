import type * as light from './light';
import type * as dark from './dark';

/* Export Ambient Color Background Colors (HEX) */
export const BaseBackground: ColorScale<HexColor> = {
	light: '#FFFFFF',
	dark: '#181819',
};

/* Export Ambient Color Scales (HEX) */
export * from './light';
export * from './dark';

/* Export Ambient Color Scales Names as Types */
export type lightColorsType = keyof typeof light;
export type darkColorsType = keyof typeof dark;
