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
.qrcode {
  display: flex;
  justify-content: center;
}
</style>