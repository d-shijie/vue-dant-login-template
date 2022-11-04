<template>
  <div>
    <div class="verify" v-if="sliderVisible">
      <slider-verify :l="42" :r="10" :w="480" :h="262" @success="forgetState.verifySuccess"></slider-verify>
    </div>
    <div v-else>
      <h2>找回密码</h2>
      <el-form :model="forgetState.forgetParams" :rules="forgetState.forgetRules" ref="forgetFormRef"
        :hide-required-asterisk="true" label-width="55px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="forgetState.forgetParams.phone" size="large" :prefix-icon="Iphone"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input show-password v-model="forgetState.forgetParams.newPassword" size="large" :prefix-icon="Lock">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="anginPassword">
          <el-input show-password v-model="forgetState.forgetParams.anginPassword" size="large" :prefix-icon="Lock">
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-row class="captcha">
            <el-col :span="15">
              <el-input v-model="forgetState.forgetParams.captcha" size="large" :prefix-icon="Message"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button :disabled="forgetState.sendLimitTime !== 0" size="large" @click="forgetState.getPhoneCaptcha">
                {{ forgetState.sendLimitTime === 0 ? '发送验证码' : forgetState.sendLimitTime + ' 秒后重发' }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div style="width:100%">
          <el-button :loading="loading" size="large" @click="forgetState.confirm" style="width:100%;">确 认</el-button>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Iphone, Lock, Message } from '@element-plus/icons-vue'
import { reactive, ref, h } from 'vue';
import { checkPassword } from '@/utils/validator'
import { ElMessage, ElNotification } from 'element-plus';
import SliderVerify from '@/components/slider-verify/index.vue'
import { getPhoneCaptcha } from '@/api/login';
import { useControlStore } from '@/stores/control';
const store = useControlStore()
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== forgetState.forgetParams.newPassword) {
    callback(new Error("两次密码必须相同"))
  } else {
    callback()
  }
}
const forgetFormRef = ref<any>()
const sliderVisible = ref<boolean>(false)
const timer = ref<any>(null)
const loading = ref<boolean>(false)
const forgetState = reactive({
  sendLimitTime: 0,
  forgetParams: {
    phone: '111',
    newPassword: '111aaa```',
    anginPassword: '111aaa```',
    captcha: '111'
  },
  forgetRules: {
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    newPassword: [{ validator: checkPassword, trigger: 'blur' }],
    anginPassword: [{ validator: validatePass, trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  },
  confirm: () => {
    forgetFormRef.value.validate((valid: boolean) => {
      if (!valid) {
        return
      }
      loading.value = true
      setTimeout(() => {
        loading.value = false
        store.SET_FLAG('userLogin')
      }, 2000)
    })
  },
  getPhoneCaptcha: () => {
    if (forgetState.forgetParams.phone !== '') {
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
      forgetState.sendLimitTime = 10
      timer.value = setInterval(() => {
        if (forgetState.sendLimitTime > 0) {
          forgetState.sendLimitTime--
        }
      }, 1000)
    })
  }
})
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

  height: 40px;

  .el-button {

    overflow: hidden;
  }
}
</style>