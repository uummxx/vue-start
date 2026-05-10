<script setup lang="ts">
definePage({
  name: 'index', // 路由名字 留空将以路由地址作为名字
  meta: {

  },
  alias: ['/', '/home'],
})
</script>

<template>
  <HelloWorld msg="Hello Vue Start" />
</template>

<style scoped>

</style>
