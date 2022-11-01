<script setup>
import { useUserStore } from '@/store/modules/user'
import { Message, Lock } from '@element-plus/icons-vue'
import SendMessageBtn from './SendMessageBtn.vue'
import ConfirmForm from './ConfirmForm.vue'

// 获取router变量
const vueRouter = useRouter()
// 获取store变量
const userStore = useUserStore()

const emailFormRef = ref()
const step = ref('one')

// 定义表单对象
const emailFormModel = reactive({
  email: '',
  code: '',
  loginButtonDisabled: false,
  loginButtonLoading: false,
  loginButtonName: '下一步'
})
// 定义表单校验规则
const emailFormRules = reactive({
  email: [{ required: true, message: '请输入邮箱！', trigger: 'blur' }],
  code: [{ required: true, message: '请输入邮箱验证码！', trigger: 'blur' }]
})

// 提交表单方法
const submitForm = (formEl) => {
  emailFormModel.loginButtonDisabled = true
  emailFormModel.loginButtonLoading = true
  formEl.validate((valid) => {
    if (valid) {
      step.value = 'two'
    } else {
      emailFormModel.loginButtonDisabled = false
      emailFormModel.loginButtonLoading = false
    }
  })
}

</script>

<template>
  <el-form v-if="step === 'one'" ref="emailFormRef" :model="emailFormModel" status-icon :rules="emailFormRules">
    <el-form-item prop="email">
      <el-input v-model="emailFormModel.email" :prefix-icon="Message" placeholder="请输入邮箱" clearable />
    </el-form-item>
    <el-form-item prop="code">
      <div class="flex flex-grow items-center">
        <el-input
          v-model="emailFormModel.code"
          type="code"
          :prefix-icon="Lock"
          placeholder="请输入邮箱验证码"
          clearable
        />
        <SendMessageBtn/>
      </div>
    </el-form-item>
    <div class="flex justify-center mt-6">
      <el-button
        type="primary"
        @click="submitForm(emailFormRef)"
        :disabled="emailFormModel.loginButtonDisabled"
        :loading="emailFormModel.loginButtonLoading"
      >
        {{ emailFormModel.loginButtonName }}
      </el-button>
    </div>
  </el-form>
  <ConfirmForm v-else/>
</template>

<style lang="scss" scoped></style>
