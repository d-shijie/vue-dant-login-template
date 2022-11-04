<template>
  <div>
    <h2>注册账号</h2>
    <el-form :model="registerState.registerParams" :rules="registerState.registerRules" ref="registerFormRef"
      :hide-required-asterisk="true" label-width="55px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="registerState.registerParams.username" size="large" :prefix-icon="User"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="newPassword">
        <el-input show-password v-model="registerState.registerParams.newPassword" size="large" :prefix-icon="Lock">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="anginPassword">
        <el-input show-password v-model="registerState.registerParams.anginPassword" size="large" :prefix-icon="Lock">
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-row class="captcha">
          <el-col :span="15">
            <el-input v-model="registerState.registerParams.captcha" size="large" :prefix-icon="Message"></el-input>
          </el-col>
          <el-col :span="8">
            <el-image v-loading="captchaLoading" class="captcha" style="width:100%;height:40px" @click="createCaptcha"
              :src="registerState.captchaImg" alt="">
            </el-image>
          </el-col>
        </el-row>
      </el-form-item>
      <div style="width:100%">
        <el-button :loading="loading" size="large" @click="registerState.confirm" style="width:100%;">确 认</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { checkPassword } from '@/utils/validator';
import { User, Message, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useControlStore } from '@/stores/control';
import { getCaptcha } from '@/api/login';
const store = useControlStore()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerState.registerParams.newPassword) {
    callback(new Error("两次密码必须相同"))
  } else {
    callback()
  }
}
const registerFormRef = ref<any>()
const loading = ref<boolean>(false)
const captchaLoading = ref(false)
const registerState = reactive({
  captchaImg: '',
  registerParams: {
    username: '11',
    newPassword: '@www111',
    anginPassword: '@www111',
    captcha: 'dant'
  },
  registerRules: {
    username: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    newPassword: [{ validator: checkPassword, trigger: 'blur' }],
    anginPassword: [{ validator: validatePass, trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  },
  confirm: () => {
    registerFormRef.value.validate((valid: boolean) => {
      if (!valid) {
        return
      }
      loading.value = true
      setTimeout(() => {
        loading.value = false
        store.SET_FLAG('userLogin')
      }, 2000)
    })
  }
})
const createCaptcha = () => {
  captchaLoading.value = true
  getCaptcha().then((res: any) => {
    registerState.captchaImg = res.data.data.captcha
    captchaLoading.value = false
  })
}
createCaptcha()
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
  color: $button-color-active;
  margin-bottom: 15px;
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