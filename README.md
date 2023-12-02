# @tomjs/electron-devtools-installer

![npm](https://img.shields.io/npm/v/%40tomjs/electron-devtools-installer) ![node-current (scoped)](https://img.shields.io/node/v/%40tomjs/electron-devtools-installer) ![NPM](https://img.shields.io/npm/l/%40tomjs%2Felectron-devtools-installer)

> Install Chrome extension for Electron, Support `cjs`/`esm`

This library is based on [Samuel Attard](https://github.com/MarshallOfSound)'s [electron-devtools-installer](https://github.com/MarshallOfSound/electron-devtools-installer) and [JonLuca De Caro](https://github.com/jonluca)'s [electron-extension-installer](https://github.com/JonLuca/electron-extension-installer), with some modifications and added small features. It provides support for `esm` and `cjs` to support for `Electron v28+`.

For Chrome DevTools installation, please visit the [Official Documentation](https://www.electronjs.org/docs/latest/tutorial/devtools-extension).

**English** | [中文](./README.zh_CN.md)

## Install

With `pnpm`

```bash
pnpm add @tomjs/electron-devtools-installer
```

With `yarn`

```bash
yarn add @tomjs/electron-devtools-installer
```

With `npm`

```bash
npm i @tomjs/electron-devtools-installer
```

## Usage

- **esm**

```js
import { app } from 'electron';
import { installExtension, VUEJS_DEVTOOLS } from '@tomjs/electron-devtools-installer';

// Install Vue.js DevTools
app.whenReady().then(() => {
  installExtension(VUEJS_DEVTOOLS) // equals to installExtension("nhdogjmejiglipccpnnnanhbledajbpd")
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));
});
```

- **cjs**

```js
const { app } = require('electron');
const { installExtension, VUEJS_DEVTOOLS } = require('@tomjs/electron-devtools-installer');

// Install Vue.js DevTools
app.whenReady().then(() => {
  installExtension(VUEJS_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));
});
```

## API

### Preset Chrome Extensions ID

The following is a list of preset Chrome extensions ID:

| ID | Name |
| --- | --- |
| `ANGULAR_DEVTOOLS` | [Angular DevTools](https://chromewebstore.google.com/detail/ienfalfjdbdpebioblfackkekamfmbnh) |
| `APOLLO_CLIENT_TOOLS` | [Apollo Client Devtools](https://chromewebstore.google.com/detail/jdkknkkbebbapilgoeccciglkfbmbnfm) |
| `BACKBONE_DEBUGGER` | [Backbone Debugger](https://chromewebstore.google.com/detail/bhljhndlimiafopmmhjlgfpnnchjjbhd) |
| `EMBER_INSPECTOR` | [Ember Inspector](https://chromewebstore.google.com/detail/bmdblncegkenkacieihfhpjfppoconhi) |
| `JQUERY_DEBUGGER` | [jQuery Debugger](https://chromewebstore.google.com/detail/dbhhnnnpaeobfddmlalhnehgclcmjimi) |
| `MOBX_DEVTOOLS` | [MobX DevTools](https://chromewebstore.google.com/detail/pfgnfdagidkfgccljigdamigbcnndkod) |
| `REACT_DEVELOPER_TOOLS` | [React Developer Tools](https://chromewebstore.google.com/detail/fmkadmapgofadopljbjfkapdkoienihi) |
| `REDUX_DEVTOOLS` | [Redux DevTools](https://chromewebstore.google.com/detail/lmhkpmbekcpmknklioeibfkpmmfibljd) |
| `VUEJS_DEVTOOLS` | [Vue.js DevTools](https://chromewebstore.google.com/detail/nhdogjmejiglipccpnnnanhbledajbpd) |

### installExtension(extensionIds[, options])

install chrome extension for electron

- **extensionIds**: `string | string[]` - Chrome extension id
- **options**: Install extension options
  - _loadExtensionOptions_: [session.LoadExtensionOptions](https://www.electronjs.org/docs/latest/api/session#sesloadextensionpath-options)
  - _forceDownload_: `boolean` - Force to download the extension even if it's already installed, default is `false`

Returns `Promise<string | string[]>` - extension name

### downloadExtension(extensionId[, options])

download chrome extension for electron

- **extensionId**: `string` - Chrome extension id
- **options**: Download extension options
  - _force_: `boolean` - Force to download the extension even if it's already installed, default is `false`
  - _unzip_: `boolean` - Whether to unzip the downloaded file, default is `true`
  - _attempts_: `number` - Number of attempts to download the extension, default is `5`
  - _outPath_: `string` - The path to save the downloaded extension, default is `path.join(app.getPath('userData'), 'extensions')`

Returns `Promise<string>` - When `unzip` is `true`, returns the path to the unzipped extension path, otherwise returns the path to the downloaded extension path.
