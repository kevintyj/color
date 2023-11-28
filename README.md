# Flex Design Colors
**An intentional, transparent, and accessible color system for the modern web.**

---

[![🚀 Build & Publish](https://github.com/kevintyj/color/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/kevintyj/color/actions/workflows/publish.yml)
[![🧪 CI Tests](https://github.com/kevintyj/color/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/kevintyj/color/actions/workflows/ci.yml)
[![Latest Release](https://img.shields.io/github/v/release/kevintyj/color)](https://github.com/kevintyj/color/releases)
[![License](https://img.shields.io/github/license/kevintyj/color)](https://github.com/kevintyj/color/blob/main/LICENSE)

Accessibility tested color scale library for the modern web and mobile, packaged, and ready to use with any styling 
library. Check out [Ambient Colors](https://github.com/kevintyj/ambient) for more information!

## Getting started
### Install the colors as a dependency 
```bash
pnpm add @kevintyj/color
```
### Use the colors as objects inside any js(x)/ts(x) file
Use any of the colors as objects by importing the color variables
```js
import { BaseBackground, blue } from '@kevintyj/color';

const blueScale = blue;
/*
blueScale = {
    0: '#e9eefe',
    1: '#dddffc',
    2: '#cac9f9',
    3: '#afacf5',
    4: '#7b7ced',
    5: '#5f68e9',
    6: '#264fe3',
    7: '#1a39ac',
    8: '#102478',
    9: '#061148',
};
*/

const backgroundLight = BaseBackground.light;
/*
backgroundLight = '#FFFFFF';
*/
```

Import the types in a typescript porject for typesafety when using the entire scale

```ts
import type { lightColorsType } from '@kevintyj/color';

const colorProp: lightColorsType = 'blue';
/*
typeof colorProp = 'neutral' | 'ocean' | 'blue' | 'indigo'  ...
*/
```

### Use with other styling libraries 
**Use with [tailwind](https://tailwindcss.com)**

`tailwind.config.js`

```js
import { BaseBackground, blue, blueDark } from '@kevintyj/color';

/** @type {import('tailwindcss').Config} */
export default {
  // ...
  theme: {
    extend: {
      colors: {
        BaseBackground,
        blue,
        blueDark
      },
    },
  },
  // ...
};
```

`component.html`

```html
<div class="bg-blue-5">This div has a wonderfully blue color!</div>
```

You can also import all the colors at once.

> This method of importing colors imports both the light and dark colors

`tailwind.config.js`

```js
import * as colors from '@kevintyj/color';

/** @type {import('tailwindcss').Config} */
export default {
  // ...
  theme: {
    extend: {
      colors: {
        ...colors
      },
    },
  },
  // ...
};
```

**Use with [unocss](https://tailwindcss.com)**

`uno.config.ts`

```ts
import {
  defineConfig,
} from 'unocss'
import { BaseBackground, blue, blueDark } from '@kevintyj/color';

export default defineConfig({
  // ...
  theme: {
    colors: {
      BaseBackground,
      blue,
      blueDark
    },
  },
  // ...
});
```

`component.html`

```html
<div class="bg-blue-5">This div has a wonderfully blue color!</div>
```

You can also import all the colors at once by calling `import * as colors from '@kevintyj/color'` and calling 
`...colors` in the theme config.

## License

Licensed under the BSD-3 License, Copyright © 2023-present [Kevin Taeyoon Jin](https://github.com/kevintyj).

See [LICENSE](./LICENSE) for more information
