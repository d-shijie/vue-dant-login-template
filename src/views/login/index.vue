<template>
  <div>
    <canvas id="canvas_login" style="display:block">
    </canvas>
    <div class="login-card">
      <el-card>
        <div class="title" style="text-align:center">
          <span>DANT TEMPLATE</span>
        </div>
        <el-form ref="loginFormRef" :hide-required-asterisk="true" label-width="54px" :model="loginState.loginForm"
          :rules="loginState.loginRule">
          <el-form-item label="账号" prop="username">
            <el-input size="large" v-model="loginState.loginForm.username" :prefix-icon="User">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input size="large" v-model="loginState.loginForm.password" show-password :prefix-icon="Lock">
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-row class="captcha">
              <el-col :span="16">
                <el-input v-model="loginState.loginForm.captcha" size="large" :prefix-icon="Message"></el-input>
              </el-col>
              <el-col :span="6">
                <img style="width:100%;height:40px" src="@/assets/captcha.png" alt="">
              </el-col>
            </el-row>
          </el-form-item>
          <div style="width:100%">
            <el-button size="large" style="width:100%;" :loading="loading" @click="loginState.login">登 录</el-button>
          </div>
          <div class="forget_register">
            <span>忘记密码</span>
            <span>注册账号</span>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { init } from './render'
import { User, Lock, Message } from '@element-plus/icons-vue'
const loginFormRef = ref()
const loading = ref(false)
// 注册/修改密码复杂度验证
// const checkPassword = (rule: any, value: any, callback: any) => {
//   if (!value) {
//     return callback(new Error('请输入密码'))
//   }
//   if (value.length < 6) {
//     callback(new Error('密码长度必须大于等于六位数'))
//   } else {
//     const regex1 = /^\d+$/
//     const regex2 = /^[A-Za-z]+$/
//     const regex3 = /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/
//     if (regex1.test(value) || regex2.test(value) || regex3.test(value)) {
//       callback('弱爆了')
//       callback()
//     } else if (/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(value) || /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(value) || /^[A-Za-z\d]+$/.test(value)) {
//       callback('还不错')
//       callback()
//     } else if (/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
//       value)) {
//       callback('太牛了')
//       callback()
//     }
//   }
// }
const loginState = reactive({
  loginForm: {
    username: '',
    password: '',
    captcha: ''
  },
  loginRule: {
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  },
  login: (): void => {
    loginFormRef.value.validate((valid: boolean) => {
      if (!valid) {
        return
      }
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 2000)
    })
  }
})

onMounted(() => {
  const canvas = document.querySelector('#canvas_login') as HTMLCanvasElement
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  init(canvas, width, height, { num: 88 })
})
</script>
  
<style scoped lang="scss">
.login-card {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

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

  .forget_register {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    cursor: pointer;
    color: #fff;

    span:hover {
      color: $button-color-active;
    }
  }
}

:deep(.captcha) {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 40px;
}
</style>
