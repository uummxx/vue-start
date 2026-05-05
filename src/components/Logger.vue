<script setup lang="ts">
import { loggerStorage } from '~/utils/logger'
</script>

<template>
  <div class="bg-red">
    <h1>Logger</h1>
    <div v-for="(group, index) in loggerStorage" :key="index">
      <pre v-for="(log, logIndex) in group" :key="logIndex">
        {{ logger.format(log) }}
      </pre>
    </div>
  </div>
</template>

<style scoped>

</style>
