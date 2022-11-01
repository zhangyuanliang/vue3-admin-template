<script setup>
const confirmFormRef = ref()
const confirmFormModel = reactive({
  newPassword: '',
  confirmPassword: '',
  loginButtonDisabled: false,
  loginButtonLoading: false,
  loginButtonName: '保存'
})
const confirmFormRules = reactive({
  newPassword: [{ required: true, message: '请输入新密码！', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请输入确认新密码！', trigger: 'blur' }]
})
const submitForm = () => {
  confirmFormModel.loginButtonDisabled = true
  confirmFormModel.loginButtonLoading = true
  confirmFormRef.value.validate((valid) => {
    if (valid) {
    } else {
      confirmFormModel.loginButtonDisabled = false
      confirmFormModel.loginButtonLoading = false
    }
  })
}
</script>

<template>
  <el-form ref="confirmFormRef" :model="confirmFormModel" status-icon :rules="confirmFormRules">
    <el-form-item prop="newPassword">
      <el-input v-model="confirmFormModel.newPassword" :prefix-icon="Lock" placeholder="请输入新密码" clearable />
    </el-form-item>
    <el-form-item prop="newPassword">
      <el-input
        v-model="confirmFormModel.confirmPassword"
        :prefix-icon="Lock"
        placeholder="请输入确认新密码"
        clearable
      />
    </el-form-item>
    <div class="flex justify-center mt-6">
      <el-button
        type="primary"
        @click="submitForm"
        :disabled="confirmFormModel.loginButtonDisabled"
        :loading="confirmFormModel.loginButtonLoading"
      >
        {{ confirmFormModel.loginButtonName }}
      </el-button>
    </div>
  </el-form>
</template>

<style lang="scss" scoped></style>
