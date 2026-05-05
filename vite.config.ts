import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts-next'
import VueRouter from 'vue-router/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/loicduong/vite-plugin-vue-layouts-next
    Layouts(),
    // https://router.vuejs.org/
    VueRouter({
      dts: 'types/vue-router.d.ts',
      extensions: ['.vue'],
    }),

    // https://vuejs.org/
    Vue(),

    UnoCSS(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-router'],
      dts: 'types/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores', 'src/utils'],
      resolvers: [],
      vueTemplate: true,
    }), // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'types/components.d.ts',
      resolvers: [],
    }),
    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools({
      launchEditor: 'code',
    }),
  ],
  resolve: {
    alias: {
      '~': '/src',
    },
  },
})
// devtools
