<template>
  <div class="wrapper">
    <canvas id="canvas" style="display:block"></canvas>
    <el-button @click="logout" size="large">退 出</el-button>
  </div>
</template>

<script setup lang="ts">
// import { init } from '@/canvas/tree/index'
import { onMounted } from "vue";
import { TOKEN } from "@/stroage/stroage_types";
import { useRouter } from "vue-router";
import storage from "store";
const router = useRouter()
const logout = () => {
  storage.remove(TOKEN);
  router.push('/')
};
onMounted(() => {
  const WINDOW_WIDTH = document.documentElement.clientWidth;
  const WINDOW_HEIGHT = document.documentElement.clientHeight;
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  render(context, WINDOW_WIDTH / 2, WINDOW_HEIGHT, 200, -Math.PI / 2, 12, 20);
  function render (ctx: CanvasRenderingContext2D, startX: number, startY: number, length: number, angle: number, depth: number, branchWidth: number) {
    let rand = Math.random,
      _length: number,
      _angle: number,
      _depth: number,
      maxBranch = 4,
      endX: number,
      endY: number,
      maxAngle = (2 * Math.PI) / 4;
    let subBranch;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    // 线段结尾x与y坐标
    endX = startX + length * Math.cos(angle);
    endY = startY + length * Math.sin(angle);
    ctx.lineTo(endX, endY);
    ctx.lineCap = "round";
    ctx.lineWidth = branchWidth;
    if (depth <= 2) {
      ctx.strokeStyle = "rgb(0," + ((rand() * 64 + 128) >> 0) + ",0)";
    } else {
      ctx.strokeStyle = "rgb(0," + ((rand() * 64 + 64) >> 0) + ",50,25)";
    }
    ctx.stroke();
    _depth = depth - 1;
    // 判断树是否结束
    if (!_depth) {
      return;
    }
    subBranch = rand() * (maxBranch - 1) + 1;
    branchWidth *= 0.5;
    subBranch = rand() * (maxBranch - 1) + 1;
    for (let i = 0; i < subBranch; i++) {
      _angle = angle + rand() * maxAngle - maxAngle * 0.5;
      _length = length * (0.5 + rand() * 0.5);
      setTimeout(function () {
        render(ctx, endX, endY, _length, _angle, _depth, branchWidth);
        return;
      }, 30);
    }
  }
});
</script>

<style scoped>
.el-button {
  position: fixed;
  top: 24px;
  left: 24px;
}
</style>