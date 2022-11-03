<template>
  <div>
    <el-card>
      <div class="title" style="text-align:center">
        <span>DANT TEMPLATE</span>
      </div>
      <div class="video-box">
        <video id="video" width="400" height="300" autoplay loop muted></video>
        <canvas id="canvas" width="400" height="300"></canvas>
      </div>
      <canvas id="screenshotCanvas" width="400" height="300"></canvas>
      <div class="switch-button">
        <el-row>
          <el-button type="primary" @click="destroyed">关闭摄像头</el-button>
          <el-button type="primary" @click="init">开始识别</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/tracking/build/tracking-min.js';
import '@/assets/tracking/build/data/face-min.js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { faceLogin } from '@/api/login'
import { loginSuccess } from '@/utils/loginSuccess'
import { ElMessage } from 'element-plus';
import { TOKEN } from '@/stroage/stroage_types';
import storage from 'store'
const router = useRouter()
const trackerTask = ref<any>(null)
const mediaStreamTrack = ref<any>(null)
const video = ref<any>(null)
const screenshotCanvas = ref<any>(null)
const uploadLock = ref<boolean>(true)
onMounted(() => {
  init()
})
const init = () => {
  video.value = mediaStreamTrack.value = document.getElementById('video');
  screenshotCanvas.value = document.getElementById('screenshotCanvas');
  let canvas = document.getElementById('canvas') as HTMLCanvasElement;
  let context = canvas.getContext('2d') as CanvasRenderingContext2D;

  // 固定写法
  let tracker = new window.tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  //摄像头初始化
  trackerTask.value = window.tracking.track('#video', tracker, {
    camera: true
  });
  tracker.on('track', function (event: any) {
    // 检测出人脸 绘画人脸位置
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function (rect: any) {
      context.strokeStyle = '#0764B7';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
    // event.data.length长度为多少代表检测几张人脸
    if (uploadLock.value && event.data.length) {
      //上传图片
      screenshotAndUpload();
    }
  });
}
const screenshotAndUpload = () => {
  // 上锁避免重复发送请求
  uploadLock.value = false;
  // 绘制当前帧图片转换为base64格式
  let canvas = screenshotCanvas.value;
  let _video = video.value;
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(_video, 0, 0, canvas.width, canvas.height);
  let base64Img = canvas.toDataURL('image/jpeg');

  faceLogin().then(res => {
    loginSuccess(res.data)
    destroyed()
    // 请求接口成功以后打开锁
    uploadLock.value = true;
  })

}
const destroyed = () => {
  if (!mediaStreamTrack.value) {
    return
  }
  mediaStreamTrack.value.srcObject.getTracks()[0].stop();
  trackerTask.value.stop()
}

</script>

<style scoped lang="scss">
:deep(.el-card__body) {
  padding: 24px 44px;
}

.el-card {
  color: #fff;
  width: 25vw;
  background: rgba(255, 255, 255, .1);
  border: $border;

  .title {
    font-size: 28px;
    padding-bottom: 14px;

    span {
      font-weight: 800;
      background-image: -webkit-linear-gradient(left, rgb(209, 206, 206), #aca9a7, rgb(136, 136, 132));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

/* 绘图canvas 不需显示隐藏即可 */
#screenshotCanvas {
  display: none;
}

.video-box {
  position: relative;

  width: 400px;
  height: 300px;
}

.switch-button {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

video,
canvas {
  position: absolute;
  top: 0;
  left: 0;
  border: #000000 5px solid;
}
</style>

