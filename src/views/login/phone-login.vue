<template>
  <div>
    <div class="verify" v-if="sliderVisible">
      <slider-verify :l="42" :r="10" :w="480" :h="262" @success="loginState.verifySuccess"></slider-verify>
    </div>
    <el-card v-else>
      <div class="title" style="text-align:center">
        <span>DANT TEMPLATE</span>
      </div>
      <div>
        <el-form :hide-required-asterisk="true" :model="loginState.loginParams" :rules="loginState.loginFormRule"
          ref="loginFormRef">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="loginState.loginParams.phone" :prefix-icon="Iphone" size="large"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-row class="captcha">
              <el-col :span="15">
                <el-input v-model="loginState.loginParams.captcha" size="large" :prefix-icon="Message"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button :disabled="loginState.sendLimitTime !== 0" size="large" @click="loginState.getPhoneCaptcha">
                  {{ loginState.sendLimitTime === 0 ? '发送验证码' : loginState.sendLimitTime + ' 秒后重发' }}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <div style="width:100%">
            <el-button :loading="loading" size="large" style="width:100%;" @click="loginState.login">登 录</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Message, Iphone } from '@element-plus/icons-vue'
import { reactive, ref, h } from 'vue';
import { getPhoneCaptcha, phoneLogin } from '@/api/login'
import { ElNotification } from 'element-plus'
import SliderVerify from '@/components/slider-verify/index.vue'
import { ElMessage } from 'element-plus'
import { loginSuccess } from '@/utils/loginSuccess'

const loading = ref(false)
const sliderVisible = ref(false)
const timer = ref<any>()
const loginFormRef = ref()
const loginState = reactive({
  sendLimitTime: 0,
  loginParams: {
    phone: '',
    captcha: ''
  },
  loginFormRule: {
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  },
  getPhoneCaptcha: () => {
    if (loginState.loginParams.phone !== '') {
      sliderVisible.value = true
    } else {
      ElMessage.error('请输入手机号')
    }
  },
  verifySuccess: () => {
    getPhoneCaptcha().then(res => {
      clearInterval(timer.value)
      ElNotification({
        title: '您好',
        message: h('i', { style: 'color: teal' }, '您的验证码为：' + res.data.captcha),
        duration: 10000,
        showClose: false
      })
      sliderVisible.value = false
      loginState.sendLimitTime = 10
      timer.value = setInterval(() => {
        if (loginState.sendLimitTime > 0) {
          loginState.sendLimitTime--
        }
      }, 1000)
    })
  },
  login: () => {
    loginFormRef.value.validate((valid: boolean) => {
      if (!valid) {
        return
      }
      loading.value = true
      phoneLogin(loginState.loginParams).then(res => {
        loading.value = false
        loginSuccess(res.data)
      }).catch(() => {
        loading.value = false
      })
    })

  }
})
</script>

<style scoped lang="scss">
.verify {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
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
}

:deep(.captcha) {
  display: flex;
  width: 100%;

  height: 40px;

  .el-button {
    margin-left: 20px;
    overflow: hidden;
  }
}
</style>