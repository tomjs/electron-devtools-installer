import { defineConfig } from 'tsdown';
import pkg from './package.json';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  target: ['es2021', 'node16'],
  external: ['electron'].concat(Object.keys(pkg.dependencies)),
  clean: true,
  dts: true,
  publint: true,
});
