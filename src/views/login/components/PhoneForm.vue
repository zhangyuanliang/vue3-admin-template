<template>
  <el-form ref="loginFormRef" :model="loginFormModel" status-icon :rules="loginFormRules" class="form-wrap">
    <el-form-item prop="phone">
      <el-input v-model="loginFormModel.phone" :prefix-icon="Phone" placeholder="请输入手机号" clearable />
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
        <SendMessageBtn/>
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
import { useUserStore } from '@/store/modules/user'
import { Phone, Lock } from '@element-plus/icons-vue'
import SendMessageBtn from './SendMessageBtn.vue'

// 获取router变量
const vueRouter = useRouter()
// 获取store变量
const userStore = useUserStore()

const loginFormRef = ref()

// 定义表单对象
const loginFormModel = reactive({
  phone: '',
  code: '',
  loginButtonDisabled: false,
  loginButtonLoading: false,
  loginButtonName: '下一步'
})
// 定义表单校验规则
const loginFormRules = reactive({
  phone: [{ required: true, message: '请输入手机号！', trigger: 'blur' }],
  code: [{ required: true, message: '请输入短信验证码！', trigger: 'blur' }]
})

// 提交表单方法
const submitForm = (formEl) => {
  loginFormModel.loginButtonDisabled = true
  loginFormModel.loginButtonLoading = true
  formEl.validate((valid) => {
    if (valid) {
      userStore
        .loginRequest(loginFormModel)
        .then(() => {

        })
        .catch(() => {
          loginFormModel.loginButtonDisabled = false
          loginFormModel.loginButtonLoading = false
        })
    } else {
      loginFormModel.loginButtonDisabled = false
      loginFormModel.loginButtonLoading = false
    }
  })
}

</script>

<style lang="scss" scoped></style>
