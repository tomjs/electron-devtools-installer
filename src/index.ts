import type { Session } from 'electron';
import { session } from 'electron';
import { downloadExtension, downloadFile } from './utils';

export * from './extensions';
export { downloadExtension, downloadFile };

/**
 * Install extension options.
 */
export interface InstallOptions {
  /**
   * Force to download the extension even if it's already installed. Default is `false`.
   * @default false
   */
  forceDownload?: boolean;
  /**
   * Options for loading an unpacked extension.
   * @see https://www.electronjs.org/docs/latest/api/session#sesloadextensionpath-options
   */
  loadExtensionOptions?: Electron.LoadExtensionOptions;
  /**
   * Download url source. When the OS language is `zh_CN` , the default value is `npmmirror`, otherwise it is `chrome`.
   * @see https://www.npmjs.com/package/@tomjs/electron-devtools-files
   * @default "chrome"
   */
  source?: 'chrome' | 'unpkg' | 'jsdelivr' | 'npmmirror';
  /**
   * The target session on which the extension shall be installed, default is `session.defaultSession`.
   */
  session?: string | Session;
}

/**
 * Install Chrome extension for Electron
 * @param extensionId Extension id
 * @param options Install options
 */
export async function installExtension(
  extensionId: string,
  options?: InstallOptions,
): Promise<Electron.Extension>;

/**
 * Install Chrome extensions for Electron
 * @param extensionIds Extension ids
 * @param options Install options
 */
export async function installExtension(
  extensionIds: string[],
  options?: InstallOptions,
): Promise<Electron.Extension[]>;

export async function installExtension(
  extensionIds: string | string[],
  options?: InstallOptions,
): Promise<Electron.Extension | Electron.Extension[]> {
  const opts = Object.assign({}, options);
  const { loadExtensionOptions = {}, forceDownload } = opts;

  const targetSession
    = typeof opts.session === 'string'
      ? session.fromPartition(opts.session)
      : opts.session || session.defaultSession;

  const loadExtensionOpts = Object.assign(
    {
      allowFileAccess: true,
    },
    loadExtensionOptions,
  );

  if (process.type !== 'browser') {
    return Promise.reject(
      new Error('electron-devtools-installer can only be used from the main process'),
    );
  }

  if (Array.isArray(extensionIds)) {
    const exts: Electron.Extension[] = [];
    for (let i = 0; i < extensionIds.length; i++) {
      const id = extensionIds[i];
      await installExtension(id, options).then((ext) => {
        exts.push(ext);
      });
    }
    return exts;
  }

  let crxId: string;
  if (typeof extensionIds === 'string') {
    crxId = extensionIds;
  }
  else {
    return Promise.reject(new Error(`Invalid extensionReference passed in: "${extensionIds}"`));
  }

  return downloadExtension(crxId, { force: forceDownload, source: opts.source }).then((result) => {
    // @ts-ignore
    return targetSession.extensions
    // @ts-ignore
      ? targetSession.extensions.loadExtension(result.unzipPath as string, loadExtensionOpts)
      : targetSession.loadExtension(result.unzipPath as string, loadExtensionOpts).catch((err) => {
          console.error(`Failed to install extension: ${crxId}`);
          console.error(err);
          return Promise.reject(err);
        });
  });
}

export default installExtension;
