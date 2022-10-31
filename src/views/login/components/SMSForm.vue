<template>
  <el-form ref="loginFormRef" :model="loginFormModel" status-icon :rules="loginFormRules" class="form-wrap">
    <el-form-item prop="username">
      <el-input v-model="loginFormModel.username" :prefix-icon="User" placeholder="请输入手机号" clearable />
    </el-form-item>
    <el-form-item prop="code">
      <div class="flex flex-grow items-center">
        <el-input
          v-model="loginFormModel.code"
          type="code"
          :prefix-icon="Lock"
          placeholder="请输入短信验证码"
          clearable
        />
        <div
          v-if="!sendData.isSendedMessage"
          @click="sendMessage"
          class="w-32 h-8 bg-indigo-500 cursor-pointer rounded-lg text-white text-center ml-2 leading-8"
        >
          获取验证码
        </div>
        <div v-else class="w-32 h-8 bg-gray-500 cursor-not-allowed rounded-lg text-white text-center ml-2 leading-8">
          已发送 {{ sendData.count }} 秒
        </div>
      </div>
    </el-form-item>
    <div class="flex justify-center mt-6">
      <el-button
        type="primary"
        @click="submitForm(loginFormRef)"
        :disabled="loginFormModel.loginButtonDisabled"
        :loading="loginFormModel.loginButtonLoading"
      >
        {{ loginFormModel.loginButtonName }}
      </el-button>
    </div>
  </el-form>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { getVerifyCodeImg } from '@/api/user'
import { User, Lock } from '@element-plus/icons-vue'

// 获取router变量
const vueRouter = useRouter()
// 获取store变量
const userStore = useUserStore()

const loginFormRef = ref()
const sendData = reactive({
  isSendedMessage: false,
  count: 60,
  interval: null
})

// 定义表单对象
const loginFormModel = reactive({
  username: '',
  code: '',
  code: '',
  uuid: '',
  codeUrl: '',
  loginButtonDisabled: false,
  loginButtonLoading: false,
  loginButtonName: '登录'
})
// 定义表单校验规则
const loginFormRules = reactive({
  username: [{ required: true, message: '请输入手机号！', trigger: 'blur' }],
  code: [{ required: true, message: '请输入短信验证码！', trigger: 'blur' }]
})

// 提交表单方法
const submitForm = (formEl) => {
  loginFormModel.loginButtonDisabled = true
  loginFormModel.loginButtonLoading = true
  loginFormModel.loginButtonName = '登录中...'
  console.log('first')
  formEl.validate((valid) => {
    if (valid) {
      userStore
        .loginRequest(loginFormModel)
        .then(() => {
          vueRouter.push({ path: '/dashboard' }).catch(() => {})
        })
        .catch(() => {
          loginFormModel.loginButtonDisabled = false
          loginFormModel.loginButtonLoading = false
          loginFormModel.loginButtonName = '登录'
        })
    } else {
      loginFormModel.loginButtonDisabled = false
      loginFormModel.loginButtonLoading = false
      loginFormModel.loginButtonName = '登录'
    }
  })
}
// 获取验证码
const sendMessage = () => {
  sendData.isSendedMessage = true
  disCount(60)
  getVerifyCodeImg().then((res) => {
    loginFormModel.codeUrl = 'data:image/gif;base64,' + res.img
    loginFormModel.uuid = res.uuid
  })
}
const disCount = (val) => {
  sendData.count = val
  sendData.interval = setInterval(function () {
    sendData.count--
    console.log(sendData.count)
  }, 1000)
}

onBeforeUnmount(() => {
  clearInterval(sendData.interval)
  sendData.interval = null
})
</script>

<style lang="scss" scoped></style>
