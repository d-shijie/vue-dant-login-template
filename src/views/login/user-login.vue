<template>
  <div>
    <el-card>
      <div class="title" style="text-align:center">
        <span>DANT TEMPLATE</span>
      </div>
      <Register v-if="store.flag === 'register'" />
      <ForgetPassword v-if="store.flag === 'forgetPassword'" />
      <el-form v-if="store.flag === 'userLogin'" ref="loginFormRef" :hide-required-asterisk="true" label-width="54px"
        :model="loginState.loginForm" :rules="loginState.loginRule">
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
              <el-image v-loading="captchaLoading" class="captcha" style="width:100%;height:40px" @click="createCaptcha"
                :src="loginState.captchaImg" alt="">
              </el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <div style="width:100%">
          <el-button size="large" style="width:100%;" :loading="loading" @click="loginState.userLogin">登 录</el-button>
        </div>
        <div class="forget_register">
          <span @click="store.SET_FLAG('forgetPassword')">忘记密码</span>
          <span @click="store.SET_FLAG('register')">注册账号</span>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { User, Lock, Message } from '@element-plus/icons-vue'
import { login, getCaptcha } from '@/api/login'
import { loginSuccess } from '@/utils/loginSuccess'
import ForgetPassword from './modules/forget-password.vue'
import Register from './modules/register.vue'
import { useControlStore } from '@/stores/control';
const store = useControlStore()
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
        loginSuccess(res.data)
      })
    })
  }
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