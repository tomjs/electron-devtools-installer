import fs from 'node:fs';
import path from 'node:path';
import { app, net } from 'electron';
import unzip from '@tomjs/unzip-crx';
import { EXTENSIONS } from './extensions';

/**
 * Download extension options
 */
export interface DownloadOptions {
  /**
   * Force to download the extension even if it's already installed. Default is `false`
   * @default false
   */
  force?: boolean;

  /**
   * Whether to unzip the downloaded file. Default is `true`
   * @default true
   */
  unzip?: boolean;

  /**
   * Number of attempts to download the extension. Default is `5`
   * @default 5
   */
  attempts?: number;

  /**
   * The path to save the extension. Default is `path.join(app.getPath('userData'), 'extensions')`
   * @default path.join(app.getPath('userData'), 'extensions')
   */
  outPath?: string;
  /**
   * Download source. Default is `"chrome"`
   * @see https://www.npmjs.com/package/@tomjs/electron-devtools-files
   * @default "chrome"
   */
  source?: 'chrome' | 'unpkg' | 'jsdelivr';
}

/**
 * Synchronously creates a directory, like 'mkdir -p'
 * @param path directory path
 */
function mkdirp(path: string, empty?: boolean) {
  if (fs.existsSync(path)) {
    if (empty) {
      rmSync(path);
    }
    return;
  }

  fs.mkdirSync(path, { recursive: true });
}

/**
 * Synchronously removes files and directories
 * @param path file or directory path
 */
function rmSync(path: string) {
  if (!fs.existsSync(path)) {
    return;
  }
  fs.rmSync(path, { recursive: true });
}

/**
 * download file from network
 * @param url url address to download
 * @param filePath file path to save
 * @returns
 */
export const downloadFile = (url: string, filePath: string) => {
  return new Promise<void>((resolve, reject) => {
    const request = net.request(url);

    request.on('response', response => {
      if (response.statusCode !== 200) {
        reject(new Error(`File download failed, status code: ${response.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(filePath);
      // @ts-ignore
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', err => {
        fs.unlink(filePath, () => reject(err));
      });

      response.on('error', (err: any) => {
        fs.unlink(filePath, () => reject(err));
      });
    });

    request.on('error', reject);
    request.end();
  });
};

/**
 * change permissions of all files in directory
 * @param dir directory path
 * @param mode permissions mode
 */
export const changePermissions = (dir: string, mode: string | number) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    fs.chmodSync(filePath, parseInt(`${mode}`, 8));
    if (fs.statSync(filePath).isDirectory()) {
      changePermissions(filePath, mode);
    }
  });
};

export function getExtensionPath() {
  return path.join(app.getPath('userData'), 'extensions');
}

/**
 * download chrome extension
 * @param extensionId extension id
 * @param options download extension options
 */
export async function downloadExtension(
  extensionId: string,
  options?: DownloadOptions,
): Promise<{ filePath: string; unzipPath?: string }> {
  const opts = Object.assign({ attempts: 5, unzip: true }, options);
  const attempts = opts.attempts || 5;
  const outPath = opts.outPath || getExtensionPath();
  const source = opts.source || 'chrome';

  mkdirp(outPath);

  const unzipPath = path.join(outPath, extensionId);

  return new Promise((resolve, reject) => {
    const filePath = path.resolve(`${unzipPath}.crx`);
    const unzipExtension = () => {
      mkdirp(unzipPath, true);

      unzip(filePath, unzipPath)
        .then(() => {
          changePermissions(unzipPath, 755);
          return resolve({ filePath, unzipPath });
        })
        .catch((err: Error) => {
          if (!fs.existsSync(path.resolve(unzipPath, 'manifest.json'))) {
            return reject(err);
          }
        });
    };

    if (fs.existsSync(filePath) && !opts.force) {
      if (!fs.existsSync(unzipPath)) {
        unzipExtension();
        return;
      }

      return resolve({ filePath, unzipPath });
    }

    let fileUrl = `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${extensionId}%26uc&prodversion=32`;
    if (['unpkg', 'jsdelivr'].includes(source) && EXTENSIONS.includes(extensionId)) {
      fileUrl =
        source === 'unpkg'
          ? `https://unpkg.com/@tomjs/electron-devtools-files/extensions/${extensionId}.crx`
          : `https://cdn.jsdelivr.net/npm/@tomjs/electron-devtools-files/extensions/${extensionId}.crx`;
    }

    downloadFile(fileUrl, filePath)
      .then(() => {
        if (!opts.unzip) {
          return resolve({ filePath });
        }

        unzipExtension();
      })
      .catch(err => {
        console.log(`Failed to fetch extension, trying ${attempts - 1} more times`);
        if (attempts <= 1) {
          return reject(err);
        }
        setTimeout(() => {
          downloadExtension(extensionId, {
            ...opts,
            attempts: attempts - 1,
          })
            .then(resolve)
            .catch(reject);
        }, 200);
      });
  });
}
