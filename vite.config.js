import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'vue3-admin-template'
        }
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'pinia',
        'vue-router',
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/icons/common'), resolve(process.cwd(), 'src/icons/nav-bar')],
      symbolId: 'icon-[dir]-[name]'
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
