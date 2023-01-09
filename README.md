# @skyra/char

[![GitHub](https://img.shields.io/github/license/skyra-project/char)](https://github.com/skyra-project/char/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/skyra-project/char/branch/main/graph/badge.svg?token=DA10PXDZ06)](https://codecov.io/gh/skyra-project/char)

[![npm](https://img.shields.io/npm/v/@skyra/char?color=crimson&label=NPM&logo=npm&style=flat-square)](https://www.npmjs.com/package/@skyra/char)
![npm bundle size minified (scoped)](https://img.shields.io/bundlephobia/min/@skyra/char?label=minified&logo=webpack)
![npm bundle size minzipped (scoped)](https://img.shields.io/bundlephobia/minzip/@skyra/char?label=minified&logo=webpack)

**Table of Contents**

-   [@skyra/char](#skyrachar)
    -   [About](#about)
    -   [Installation and Usage](#installation-and-usage)
        -   [Package managers](#package-managers)
            -   [Usage](#usage)
        -   [Browser build](#browser-build)
            -   [Usage](#usage-1)
    -   [Meta](#meta)
        -   [License](#license)
        -   [Contributing](#contributing)
        -   [Buy us some doughnuts](#buy-us-some-doughnuts)
        -   [Contributors ✨](#contributors-%E2%9C%A8)

## About

-   @skyra/char is a character utility library with ASCII, Latin-1, and UTF-8 support based on [.NET][]'s `char` struct, all credits to the
    [.NET][] community and thanks to the [Discord C# Community][] for helping us understand the low-level unsafe logic.
-   Supports both NodeJS and Browsers by providing CommonJS, ES Module and UMD bundles.

## Installation and Usage

### Package managers

```bash
yarn add @skyra/char
# or npm install @skyra/char
```

#### Usage

```js
const { fromCode } = require('@skyra/char');
```

```ts
import { fromCode } from '@skyra/char';
```

### Browser build

If you want to use the browser build you can pull it directly via unpkg. Note that when using a Framework such as React, Vue or Angular we recommend you refer to [the package managers section.](#package-managers)

```html
<script src="https://unpkg.com/@skyra/char"></script>
```

#### Usage

The UMD module is exported as `SkyraChar`:

```html
<script>
	SkyraChar.fromCode();
</script>
```

## Meta

### License

Copyright © 2020, [Skyra Project](https://github.com/skyra-project).
Released under the [MIT License](LICENSE.md).

### Contributing

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request!

### Buy us some doughnuts

Skyra Project is open source and always will be, even if we don't get donations. That said, we know there are amazing people who
may still want to donate just to show their appreciation. Thanks you very much in advance!

We accept donations through Patreon, BitCoin, Ethereum, and Litecoin. You can use the buttons below to donate through your method of choice.

| Donate With |         QR         |                                                                  Address                                                                  |
| :---------: | :----------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
|   Patreon   | ![PatreonImage][]  |                                               [Click Here](https://www.patreon.com/kyranet)                                               |
|   PayPal    |  ![PayPalImage][]  |                     [Click Here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CET28NRZTDQ8L)                      |
|   BitCoin   | ![BitcoinImage][]  |         [3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco](bitcoin:3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco?amount=0.01&label=Skyra%20Discord%20Bot)          |
|  Ethereum   | ![EthereumImage][] | [0xcB5EDB76Bc9E389514F905D9680589004C00190c](ethereum:0xcB5EDB76Bc9E389514F905D9680589004C00190c?amount=0.01&label=Skyra%20Discord%20Bot) |
|  Litecoin   | ![LitecoinImage][] |         [MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM](litecoin:MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM?amount=0.01&label=Skyra%20Discord%20Bot)         |

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to Skyra Project!

<a href="https://github.com/skyra-project/char/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=skyra-project/char" />
</a>

[contributing]: https://github.com/skyra-project/.github/blob/main/.github/CONTRIBUTING.md
[.net]: https://github.com/dotnet
[discord c# community]: https://discord.gg/csharp
[patreonimage]: https://cdn.skyra.pw/gh-assets/patreon.png
[paypalimage]: https://cdn.skyra.pw/gh-assets/paypal.png
[bitcoinimage]: https://cdn.skyra.pw/gh-assets/bitcoin.png
[ethereumimage]: https://cdn.skyra.pw/gh-assets/ethereum.png
[litecoinimage]: https://cdn.skyra.pw/gh-assets/litecoin.png
