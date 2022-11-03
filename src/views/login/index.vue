<template>
  <div>
    <canvas id="canvas_login" style="display:block">
    </canvas>
    <div class="login-card">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="账号密码登录" name="UserLogin">
          <UserLogin />
        </el-tab-pane>
        <el-tab-pane label="人脸登录" name="FaceLogin">
          <FaceLogin />
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>

</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { init } from '@/canvas/skyStar/render'
import UserLogin from './user-login.vue'
import FaceLogin from './face-login.vue'

const activeName = ref('UserLogin')

onMounted(() => {
  const canvas = document.querySelector('#canvas_login') as HTMLCanvasElement
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  init(canvas, width, height, { num: 88 })
})
</script>

<style>
.login-card {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>