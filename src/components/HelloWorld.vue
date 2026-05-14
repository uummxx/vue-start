<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="bg size-full flex items-center justify-center">
    <div class="relative size-280px sm:size-400px lg:size-500px flex items-center justify-center rounded-full">
      <div>
        <div class="border-10px border-red rounded-full border-solid blur-lg filter-drop-shadow" />
        <h1 class="p-2 sm:p-4 text-center text-xl sm:text-3xl c-white font-bold">
          {{ msg }}
        </h1>
        <span class="c-white text-xs sm:text-base text-center block px-4">build with vite + vue3 + typescript + unocss + auto-import + auto-layouts + auto-routes</span>
      </div>
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
