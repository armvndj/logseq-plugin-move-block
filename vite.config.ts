import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import logseqPlugin from 'vite-plugin-logseq';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    svgLoader(),
    logseqPlugin(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: ['vue'],
      resolvers: [NaiveUiResolver()],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@logseq/libs', 'naive-ui'],
        },
      },
    },
  },
});
