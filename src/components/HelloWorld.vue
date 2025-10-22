<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="size-full bg flex justify-center items-center">
    <div class="size-500px relative rounded-full flex items-center justify-center rounded-full">
      <div class="rounded-full blur-lg filter-drop-shadow border-solid border-10px border-red" />
      <h1 class="text-3xl font-bold text-center c-white p-4">
        {{ msg }}
      </h1>
    </div>
  </div>
</template>

<style scoped>
.outer {
  animation: spin 4s linear infinite;
  transform-origin: 100% 100%;
}
.inner {
  animation: spin 4s linear infinite reverse;
  transform-origin: center;
}
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(-225deg, #69eacb 0%, #eaccf8 48%, #6654f1 100%);
  background-size: 400% 400%;
  animation: move 20s ease infinite;
  z-index: -1;
}
@keyframes move {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
