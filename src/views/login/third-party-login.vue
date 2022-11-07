<template>
  <div>
    <el-card>
      <div class="title" style="text-align:center">
        <span>DANT TEMPLATE</span>
      </div>
      <div class="third-party">
        <span @click="demo" v-for="(item, index) in imgArr" :key="index">
          <img :src="item" alt="">
        </span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import qq from '@/assets/images/qq.png'
import we_chat from '@/assets/images/we_chat.png'
import alipay from "@/assets/images/alipay.png"
import { ElMessage } from 'element-plus';
const imgArr = [qq, we_chat, alipay]
const demo = () => {
  ElMessage.info('It is a demo')
}
</script>

<style scoped lang="scss">
.third-party {
  display: flex;
  justify-content: space-around;

  span {
    cursor: pointer;
    width: 40px;

    img {
      width: 100%;
    }
  }

  span:hover {
    animation: scale 1s ease-in;
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.3);
      opacity: 0.5 !important;
    }

    100% {
      transform: scale(1);
      opacity: 1 !important;
    }
  }
}
</style>