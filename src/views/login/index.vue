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
                <el-image v-loading="captchaLoading" class="captcha" style="width:100%;height:40px"
                  @click="createCaptcha" :src="loginState.captchaImg" alt="">
                </el-image>
              </el-col>
            </el-row>
          </el-form-item>
          <div style="width:100%">
            <el-button size="large" style="width:100%;" :loading="loading" @click="loginState.userLogin">登 录</el-button>
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
import { init } from '@/canvas/skyStar/render'
import { User, Lock, Message } from '@element-plus/icons-vue'
import { TOKEN } from '@/stroage/stroage_types'
import { login, getCaptcha } from '@/api/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import storage from 'store'
const router = useRouter()
const loginFormRef = ref()
const loading = ref(false)
const captchaLoading = ref(false)
const loginState = reactive({
  captchaImg: '',
  loginForm: {
    username: 'admin',
    password: 'admin',
    captcha: 'dant'
  },
  loginRule: {
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  },
  userLogin: (): void => {
    loginFormRef.value.validate((valid: boolean) => {
      if (!valid) {
        return
      }
      loading.value = true
      login(
        loginState.loginForm
      ).then(res => {
        loading.value = false
        if (!res.data.data) {
          ElMessage.error(res.data)
          return
        }
        storage.set(TOKEN, res.data.data.token)
        router.push('/dashboard')
      })
    })
  }
})

onMounted(() => {
  const canvas = document.querySelector('#canvas_login') as HTMLCanvasElement
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  init(canvas, width, height, { num: 88 })
})
const createCaptcha = () => {
  captchaLoading.value = true
  getCaptcha().then((res: any) => {
    loginState.captchaImg = res.data.data.captcha
    captchaLoading.value = false
  })
}
createCaptcha()
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

  img {
    cursor: pointer;
  }
}
</style>
