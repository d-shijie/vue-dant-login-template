<!-- 只是简单生成了二维码 -->
<template>
  <div>
    <el-card>
      <div class="title" style="text-align:center">
        <span>DANT TEMPLATE</span>
      </div>
      <div class="qrcode">
        <vue-qrcode value="https://github.com/d-shijie/vue-dant-login-template" :options="{ width: 200 }">
        </vue-qrcode>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// qrcodejs有_android is undefined bug需要修改源码 this._android->this
// import QRCode from 'qrcodejs2'
// import { onMounted, ref } from 'vue';
// const qrcode = ref<any>(null)
// const getCode = () => {
//   new QRCode(qrcode.value, {
//     width: 200,
//     height: 200,
//     text: 'test'
//   })
// }
// onMounted(() => {
//   getCode()
// })
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

.qrcode {
  display: flex;
  justify-content: center;
}
</style>