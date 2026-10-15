import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	root: 'src/',

	build: {
		outDir: '../dist',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/index.html'),
				compare: resolve(__dirname, 'src/compare.html'),
				saveload: resolve(__dirname, 'src/saveload.html'),
				filter: resolve(__dirname, 'src/filter.html'),
			},
		},
	},
});
