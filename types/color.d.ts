type HexColor = `#${string}`;

type ColorScale<T extends HexColor> = Record<any, T>;
