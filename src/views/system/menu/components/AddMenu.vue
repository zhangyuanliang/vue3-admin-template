<script setup>
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:visible', 'create', 'update'])
const formRef = ref(null)
const formData = reactive({
  account: '',
  username: '',
  password: ''
})
const formRules = reactive({
  account: [{ required: true, trigger: 'blur', message: '请输入账号！' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码！' }],
  username: [{ required: true, trigger: 'blur', message: '请输入真实姓名！' }],
  role: [{ required: true, trigger: 'blur', message: '请选择角色！' }]
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
  <el-dialog v-model="visible" :title="id ? '修改菜单' : '新增菜单'" @close="resetForm" width="60%">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
      <div class="px-4">
        <el-form-item prop="account" label="上级菜单">
          <el-input v-model="formData.account" placeholder="请输入上级菜单" />
        </el-form-item>
        <el-form-item prop="password" label="菜单名称">
          <el-input v-model="formData.password" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item prop="username" label="菜单类型">
          <el-radio-group v-model="formData.dicStatus" class="ml-4">
            <el-radio label="1">目录</el-radio>
            <el-radio label="2">菜单</el-radio>
            <el-radio label="3">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="role" label="菜单图标">
          <el-input v-model="formData.role" placeholder="请选择菜单图标" />
        </el-form-item>
        <el-form-item prop="identification" label="权限字符">
          <el-input v-model="formData.identification" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item prop="phone" label="显示排序">
          <el-input v-model="formData.phone" placeholder="请输入显示排序" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
