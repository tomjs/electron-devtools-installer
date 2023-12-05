import { session } from 'electron';
import { downloadExtension } from './utils';

export * from './extensions';
export * from './utils';

export interface InstallOptions {
  /**
   * Force to download the extension even if it's already installed
   * @default false
   */
  forceDownload?: boolean;
  /**
   * Options for loading an unpacked extension.
   * @see https://www.electronjs.org/docs/latest/api/session#sesloadextensionpath-options
   */
  loadExtensionOptions?: Electron.LoadExtensionOptions;
  /**
   * Download url source
   * @see https://www.npmjs.com/package/@tomjs/electron-devtools-files
   * @default "chrome"
   */
  source?: 'chrome' | 'unpkg' | 'jsdelivr';
}

/**
 * Install Chrome extension for Electron
 * @param extensionIds Extension id or ids
 * @param options Install options
 */
export async function installExtension(
  extensionIds: string,
  options?: InstallOptions,
): Promise<Electron.Extension>;

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
    return Promise.all(extensionIds.map(id => installExtension(id, options))) as Promise<
      Electron.Extension[]
    >;
  }

  let crxId: string;
  if (typeof extensionIds === 'string') {
    crxId = extensionIds;
  } else {
    return Promise.reject(new Error(`Invalid extensionReference passed in: "${extensionIds}"`));
  }

  return downloadExtension(crxId, { force: forceDownload, source: opts.source }).then(result => {
    return session.defaultSession
      .loadExtension(result.unzipPath as string, loadExtensionOpts)
      .then(ext => {
        return Promise.resolve(ext);
      })
      .catch(err => {
        console.error(`Failed to install extension: ${crxId}`);
        console.error(err);
        return Promise.reject(err);
      });
  });
}

export default installExtension;
