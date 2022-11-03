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
  <!-- 新增/修改 -->
  <el-dialog v-model="visible" :title="id ? '修改用户' : '新增用户'" @close="resetForm" width="60%">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="account" label="账号">
            <el-input v-model="formData.account" placeholder="请输入账号" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <el-form-item prop="password" label="密码">
            <el-input v-model="formData.password" placeholder="请输入密码" />
          </el-form-item>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="username" label="真实姓名">
            <el-input v-model="formData.username" placeholder="请输入真实姓名" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <el-form-item prop="role" label="角色">
            <el-input v-model="formData.role" placeholder="请选择角色" />
          </el-form-item>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="identification" label="身份证号">
            <el-input v-model="formData.identification" placeholder="请输入身份证号" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <el-form-item prop="phone" label="联系电话">
            <el-input v-model="formData.phone" placeholder="请输入联系电话" />
          </el-form-item>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="email" label="邮箱地址">
            <el-input v-model="formData.email" placeholder="请输入邮箱地址" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <el-form-item prop="status" label="状态">
            <el-input v-model="formData.status" placeholder="请选择状态" />
          </el-form-item>
        </div>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
