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
  upMenu: '',
  menuName: '',
  menuType: '',
  menuIcon: '',
  authority: '',
  sort: ''
})
const formRules = reactive({
  upMenu: [{ required: true, trigger: 'blur', message: '请输入上级菜单' }],
  menuName: [{ required: true, trigger: 'blur', message: '请输入菜单名称' }],
  menuType: [{ required: true, trigger: 'blur', message: '请选择菜单类型' }],
  menuIcon: [{ required: true, trigger: 'blur', message: '请选择菜单图标' }],
  authority: [{ required: true, trigger: 'blur', message: '请输入权限字符' }]
  // sort: [{ required: true, trigger: 'blur', message: '请输入显示排序' }],
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
  formRef.value.resetFields()
}
</script>

<template>
  <el-dialog v-model="visible" :title="id ? '修改菜单' : '新增菜单'" @close="resetForm" width="60%">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
      <div class="px-4">
        <el-form-item prop="upMenu" label="上级菜单">
          <el-input v-model="formData.upMenu" placeholder="请输入上级菜单" />
        </el-form-item>
        <el-form-item prop="menuName" label="菜单名称">
          <el-input v-model="formData.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item prop="menuType" label="菜单类型">
          <el-radio-group v-model="formData.menuType" class="ml-4">
            <el-radio label="1">目录</el-radio>
            <el-radio label="2">菜单</el-radio>
            <el-radio label="3">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="menuIcon" label="菜单图标">
          <el-input v-model="formData.menuIcon" placeholder="请选择菜单图标" />
        </el-form-item>
        <el-form-item prop="authority" label="权限字符">
          <el-input v-model="formData.authority" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item prop="sort" label="显示排序">
          <el-input v-model="formData.sort" placeholder="请输入显示排序" />
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
