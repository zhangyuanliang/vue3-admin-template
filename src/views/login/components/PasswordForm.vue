<template>
  <el-form ref="loginFormRef" :model="loginFormModel" status-icon :rules="loginFormRules" class="form-wrap">
    <el-form-item prop="username">
      <el-input
        v-model="loginFormModel.username"
        :prefix-icon="User"
        placeholder="请输入用户名/手机号/邮箱/身份证"
        clearable
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginFormModel.password"
        type="password"
        :prefix-icon="Lock"
        placeholder="请输入密码"
        clearable
      />
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

// 获取router变量
const vueRouter = useRouter()
// 获取store变量
const userStore = useUserStore()

const loginFormRef = ref()

// 定义表单对象
const loginFormModel = reactive({
  username: '',
  password: '',
  code: '',
  uuid: '',
  codeUrl: '',
  loginButtonDisabled: false,
  loginButtonLoading: false,
  loginButtonName: '登录'
})
// 定义表单校验规则
const loginFormRules = reactive({
  username: [{ required: true, message: '请输入用户名/手机号/邮箱/身份证！', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码！', trigger: 'blur' }]
})

// 提交表单方法
const submitForm = (formEl) => {
  loginFormModel.loginButtonDisabled = true
  loginFormModel.loginButtonLoading = true
  loginFormModel.loginButtonName = '登录中...'
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

if (import.meta.env.DEV) {
  loginFormModel.username = 'admin'
  loginFormModel.password = '123456'
}
</script>

<style lang="scss" scoped></style>
