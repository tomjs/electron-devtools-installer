# @tomjs/electron-devtools-installer

[![npm](https://img.shields.io/npm/v/@tomjs/electron-devtools-installer)](https://www.npmjs.com/package/@tomjs/electron-devtools-installer) ![node-current (scoped)](https://img.shields.io/node/v/@tomjs/electron-devtools-installer) ![NPM](https://img.shields.io/npm/l/@tomjs/electron-devtools-installer) [![Docs](https://www.paka.dev/badges/v0/cute.svg)](https://www.paka.dev/npm/@tomjs/electron-devtools-installer)

[English](./README.md) | **中文**

> 为 [Electron](https://electronjs.org/zh) 安装 Chrome 扩展，提供 `cjs`/`esm`

本库是基于 [Samuel Attard](https://github.com/MarshallOfSound) 的 [electron-devtools-installer](https://github.com/MarshallOfSound/electron-devtools-installer) 和 [JonLuca De Caro](https://github.com/jonluca) 的 [electron-extension-installer](https://github.com/JonLuca/electron-extension-installer) 做了一些修改，并增加一些小功能。提供 `esm` 和 `cjs` 支持，以支持 `Electron v28+`。

[预置](#preset-chrome-extensions-id) 的 `Chrome DevTools` 除了 [Chrome 应用商店](https://chromewebstore.google.com/) 可以选择 [npmmirror](https://npmmirror.com)、[jsdelivr](https://jsdelivr.net)、[unpkg](https://unpkg.com) 加速下载。相关的扩展由 [electron-devtools-files](https://github.com/tomjs/electron-devtools-files) 定时更新和发布。

关于 `Chrome DevTools` 的安装，请参考[官方文档](https://www.electronjs.org/zh/docs/latest/tutorial/devtools-extension)。

## Features

- 支持 `cjs`/`esm`
- 支持 `Electron v28+` 使用 `esm`

## 安装

使用 `pnpm`

```bash
pnpm add @tomjs/electron-devtools-installer
```

使用 `yarn`

```bash
yarn add @tomjs/electron-devtools-installer
```

使用 `npm`

```bash
npm i @tomjs/electron-devtools-installer
```

## 使用

- **esm**

```js
import { app } from 'electron';
import { installExtension, VUEJS_DEVTOOLS } from '@tomjs/electron-devtools-installer';

// 安装 Vue.js DevTools
app.whenReady().then(() => {
  installExtension(VUEJS_DEVTOOLS) // 等同于 installExtension("nhdogjmejiglipccpnnnanhbledajbpd")
    .then(ext => console.log(`Added Extension:  ${ext.name}`))
    .catch(err => console.log('An error occurred: ', err));
});
```

- **cjs**

```js
const { app } = require('electron');
const { installExtension, VUEJS_DEVTOOLS } = require('@tomjs/electron-devtools-installer');

// 安装 Vue.js DevTools
app.whenReady().then(() => {
  installExtension(VUEJS_DEVTOOLS)
    .then(ext => console.log(`Added Extension:  ${ext.name}`))
    .catch(err => console.log('An error occurred: ', err));
});
```

## 文档

- [paka.dev](https://paka.dev) 提供的 [API文档](https://paka.dev/npm/@tomjs/electron-devtools-installer).
- [unpkg.com](https://www.unpkg.com/) 提供的 [index.d.ts](https://www.unpkg.com/browse/@tomjs/electron-devtools-installer/dist/index.d.ts).

## API

### Preset Chrome Extensions ID

以下是预设的Chrome扩展ID列表：

| ID | Name | 第三方 |
| --- | --- | --- |
| `ANGULAR_DEVTOOLS` | [Angular DevTools](https://chromewebstore.google.com/detail/ienfalfjdbdpebioblfackkekamfmbnh) | [详情](https://www.crxsoso.com/webstore/detail/ienfalfjdbdpebioblfackkekamfmbnh) |
| `APOLLO_CLIENT_TOOLS` | [Apollo Client Devtools](https://chromewebstore.google.com/detail/jdkknkkbebbapilgoeccciglkfbmbnfm) | [详情](https://www.crxsoso.com/webstore/detail/jdkknkkbebbapilgoeccciglkfbmbnfm) |
| `BACKBONE_DEBUGGER` | [Backbone Debugger](https://chromewebstore.google.com/detail/bhljhndlimiafopmmhjlgfpnnchjjbhd) | [详情](https://www.crxsoso.com/webstore/detail/bhljhndlimiafopmmhjlgfpnnchjjbhd) |
| `EMBER_INSPECTOR` | [Ember Inspector](https://chromewebstore.google.com/detail/bmdblncegkenkacieihfhpjfppoconhi) | [详情](https://www.crxsoso.com/webstore/detail/bmdblncegkenkacieihfhpjfppoconhi) |
| `JQUERY_DEBUGGER` | [jQuery Debugger](https://chromewebstore.google.com/detail/dbhhnnnpaeobfddmlalhnehgclcmjimi) | [详情](https://www.crxsoso.com/webstore/detail/dbhhnnnpaeobfddmlalhnehgclcmjimi) |
| `MOBX_DEVTOOLS` | [MobX DevTools](https://chromewebstore.google.com/detail/pfgnfdagidkfgccljigdamigbcnndkod) | [详情](https://www.crxsoso.com/webstore/detail/pfgnfdagidkfgccljigdamigbcnndkod) |
| `REACT_DEVELOPER_TOOLS` | [React Developer Tools](https://chromewebstore.google.com/detail/fmkadmapgofadopljbjfkapdkoienihi) | [详情](https://www.crxsoso.com/webstore/detail/fmkadmapgofadopljbjfkapdkoienihi) |
| `REDUX_DEVTOOLS` | [Redux DevTools](https://chromewebstore.google.com/detail/lmhkpmbekcpmknklioeibfkpmmfibljd) | [详情](https://www.crxsoso.com/webstore/detail/lmhkpmbekcpmknklioeibfkpmmfibljd) |
| `VUEJS_DEVTOOLS` | [Vue.js DevTools](https://chromewebstore.google.com/detail/nhdogjmejiglipccpnnnanhbledajbpd) | [详情](https://www.crxsoso.com/webstore/detail/nhdogjmejiglipccpnnnanhbledajbpd) |

**注意**

如果无法访问 [Chrome应用商店](https://chromewebstore.google.com/) 或者使用指定版本插件，可以通过一些第三方网站（[Crx搜搜](https://www.crxsoso.com/)、[CrxDL](https://crxdl.com/)）下载 `.crx` 文件后，改名后缀名为 `.zip`，使用压缩工具（[360压缩](https://yasuo.360.cn/)）解压，调用 [Electron](https://www.electronjs.org/docs/latest/tutorial/devtools-extension) 的 `session.defaultSession.loadExtension` 方法安装。

```js
const { app, session } = require('electron');
const path = require('node:path');
const os = require('node:os');

const reactDevToolsPath = 'crx扩展解压路径';
app.whenReady().then(async () => {
  await session.defaultSession.loadExtension(reactDevToolsPath);
});
```

### installExtension(extensionIds[, options])

为 Electron 安装 Chrome 扩展

- **extensionIds**: `string | string[]` - Chrome 扩展 id
- **options**: 安装可选配置

  - _loadExtensionOptions_: [session.LoadExtensionOptions](https://www.electronjs.org/docs/latest/api/session#sesloadextensionpath-options)
  - _forceDownload_: `boolean` - 强制下载已安装插件，默认值为 `false`
  - _source_: `'chrome' | 'unpkg' | 'jsdelivr' | 'npmmirror'` - 下载地址源。当操作系统语言为` zh_CN` 时，默认值为 `npmmirror` ，否则为 `chrome` 。

  返回 `Promise<Electron.Extension | Electron.Extension[]>` - 扩展名称/版本等

### downloadExtension(extensionId[, options])

为 Electron 下载 Chrome 扩展

- **extensionId**: `string` - Chrome 扩展 id
- **options**: 下载扩展可选配置
  - _force_: `boolean` - 强制下载扩展，即使它已经安装，默认为 `false`
  - _unzip_: `boolean` - 是否解压下载的文件，默认为 `true`
  - _attempts_: `number` - 尝试下载扩展程序的次数，默认为 `5`
  - _outPath_: `string` - 保存下载扩展的路径，默认为 `path.join(app.getPath('userData'), 'extensions')`
  - _source_: `'chrome' | 'unpkg' | 'jsdelivr' | 'npmmirror'` - 下载地址源。当操作系统语言为` zh_CN` 时，默认值为 `npmmirror` ，否则为 `chrome` 。

返回 `Promise<{ filePath: string; unzipPath?: string }>`

## 测试/调试

```bash
pnpm jest --verbose false
```
