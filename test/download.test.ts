import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { app } from 'electron';
import installExtension, {
  BACKBONE_DEBUGGER,
  downloadExtension,
  JQUERY_DEBUGGER,
  VUEJS_DEVTOOLS,
} from '../src';

function mkdirp(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function rmSync(path: string) {
  if (!fs.existsSync(path)) {
    return;
  }
  fs.rmSync(path, { recursive: true });
}

const downloadPath = path.join(cwd(), '.temp');

beforeAll(() => {
  mkdirp(downloadPath);
});

afterAll(() => {
  rmSync(downloadPath);
  rmSync(path.join(app.getPath('userData'), 'extensions'));
});

describe('download chrome extension', () => {
  it('download by crxId', async () => {
    // apollo-client-devtools
    const crxId = 'jdkknkkbebbapilgoeccciglkfbmbnfm';
    const filePath = path.join(downloadPath, `${crxId}.crx`);
    await downloadExtension(crxId, {
      outPath: downloadPath,
    });
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('download by crx name', async () => {
    const filePath = path.join(downloadPath, `${VUEJS_DEVTOOLS}.crx`);
    // Vue.js devtools
    await downloadExtension(VUEJS_DEVTOOLS, {
      outPath: downloadPath,
    });
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('download from "unpkg" ', async () => {
    const filePath = path.join(downloadPath, `${JQUERY_DEBUGGER}.crx`);
    // jQuery Debugger
    await downloadExtension(JQUERY_DEBUGGER, {
      outPath: downloadPath,
      source: 'unpkg',
    });
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('download from "jsdelivr" ', async () => {
    const filePath = path.join(downloadPath, `${BACKBONE_DEBUGGER}.crx`);
    // Backbone Debugger
    await downloadExtension(BACKBONE_DEBUGGER, {
      outPath: downloadPath,
      source: 'jsdelivr',
    });
    expect(fs.existsSync(filePath)).toBe(true);
  });
});

describe('install chrome extension', () => {
  it('install by crxId', async () => {
    // Apollo Client Devtools
    const crxId = 'jdkknkkbebbapilgoeccciglkfbmbnfm';
    const ext = await installExtension(crxId);
    expect(ext.name).toBe('Apollo Client Devtools');
  });

  it('install by crx name', async () => {
    // Vue.js devtools
    const ext = await installExtension(VUEJS_DEVTOOLS);
    expect(ext.name).toBe('Vue.js devtools');
  });

  it('install from "unpkg" ', async () => {
    // jQuery Debugger
    const ext = await installExtension(JQUERY_DEBUGGER, {
      source: 'unpkg',
    });
    expect(ext.name).toBe('jQuery Debugger');
  });

  it('install from "jsdelivr" ', async () => {
    // Backbone Debugger
    const ext = await installExtension(BACKBONE_DEBUGGER, {
      source: 'jsdelivr',
    });
    expect(ext.name).toBe('Backbone Debugger');
  });
});
