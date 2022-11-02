<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { init } from '@/canvas/tree/index'
import { onMounted } from 'vue';
onMounted(() => {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  init(canvas, width, height, {
    startX: width / 2,
    startY: height,
    length: 200,
    angle: -Math.PI / 2,
    depth: 12,
    branchWidth: 20
  })
})
</script>

<style scoped>

</style>