import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  unocss: true,
}, {
  settings: {
    'import/core-modules': ['vue-router/auto-routes'],
  },

})
