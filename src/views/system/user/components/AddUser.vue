<script setup>
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['update:visible', 'create', 'update'])
const formRef = ref(null)
const formData = reactive({
  username: '',
  password: ''
})
const formRules = reactive({
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
})
const handleCreate = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (!id) {
        emit('create', formData)
      } else {
        emit('update', formData)
      }
    } else {
      return false
    }
  })
}
const resetForm = () => {
  emit('update:visible')
  formData.username = ''
  formData.password = ''
}
</script>

<template>
  <!-- 新增/修改 -->
  <el-dialog
    v-model="visible"
    :title="id ? '修改用户' : '新增用户'"
    @close="resetForm"
    width="60%"
  >
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="formData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="formData.password" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
