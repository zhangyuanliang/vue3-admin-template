<script setup>
import { useUserStore } from '@/store/modules/user'
import { Phone, Lock } from '@element-plus/icons-vue'
import SendMessageBtn from './SendMessageBtn.vue'
import ConfirmForm from './ConfirmForm.vue'

// 获取router变量
const vueRouter = useRouter()
// 获取store变量
const userStore = useUserStore()

const formRef = ref()
const step = ref('one')

const formModel = reactive({
  phone: '',
  code: '',
  loginButtonDisabled: false,
  loginButtonLoading: false,
  loginButtonName: '下一步',
})
const formRules = reactive({
  phone: [{ required: true, message: '请输入手机号！', trigger: 'blur' }],
  code: [{ required: true, message: '请输入短信验证码！', trigger: 'blur' }]
})

const submitForm = () => {
  formModel.loginButtonDisabled = true
  formModel.loginButtonLoading = true
  formRef.value.validate((valid) => {
    if (valid) {
      step.value = 'two'
    } else {
      formModel.loginButtonDisabled = false
      formModel.loginButtonLoading = false
    }
  })
}
</script>

<template>
  <el-form v-if="step === 'one'" ref="formRef" :model="formModel" status-icon :rules="formRules">
    <el-form-item prop="phone">
      <el-input v-model="formModel.phone" :prefix-icon="Phone" placeholder="请输入手机号" clearable />
    </el-form-item>
    <el-form-item prop="code">
      <div class="flex flex-grow items-center">
        <el-input
          v-model="formModel.code"
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
        @click="submitForm"
        :disabled="formModel.loginButtonDisabled"
        :loading="formModel.loginButtonLoading"
      >
        {{ formModel.loginButtonName }}
      </el-button>
    </div>
  </el-form>
  <ConfirmForm v-else/>
</template>

<style lang="scss" scoped></style>
