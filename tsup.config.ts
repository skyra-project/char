import { defineConfig } from 'tsup';
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['src/index.ts'],
	format: ['esm', 'cjs', 'iife'],
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'es2019',
	tsconfig: 'src/tsconfig.json',
	keepNames: true,
	globalName: 'SkyraChar',
	esbuildPlugins: [nodeModulesPolyfillPlugin()],
	treeshake: true
});
