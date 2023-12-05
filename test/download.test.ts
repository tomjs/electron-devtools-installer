import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { BACKBONE_DEBUGGER, downloadExtension, JQUERY_DEBUGGER, VUEJS_DEVTOOLS } from '../src';

function mkdirp(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const downloadPath = path.join(cwd(), '.temp', 'download');

beforeAll(() => {
  mkdirp(downloadPath);
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
    // nhdogjmejiglipccpnnnanhbledajbpd
    await downloadExtension(VUEJS_DEVTOOLS, {
      outPath: downloadPath,
    });
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('download from "unpkg" ', async () => {
    const filePath = path.join(downloadPath, `${JQUERY_DEBUGGER}.crx`);
    // nhdogjmejiglipccpnnnanhbledajbpd
    await downloadExtension(JQUERY_DEBUGGER, {
      outPath: downloadPath,
      source: 'unpkg',
    });
    expect(fs.existsSync(filePath)).toBe(true);
  });
  it('download from "jsdelivr" ', async () => {
    const filePath = path.join(downloadPath, `${BACKBONE_DEBUGGER}.crx`);
    // nhdogjmejiglipccpnnnanhbledajbpd
    await downloadExtension(BACKBONE_DEBUGGER, {
      outPath: downloadPath,
      source: 'jsdelivr',
    });
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
