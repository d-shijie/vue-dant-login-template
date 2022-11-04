<template>
  <div>
    <el-card>
      <div class="title" style="text-align:center">
        <span>DANT TEMPLATE</span>
      </div>
      <div class="third-party">
        <span v-for="(item, index) in imgArr" :key="index">
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
const imgArr = [qq, we_chat, alipay]
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