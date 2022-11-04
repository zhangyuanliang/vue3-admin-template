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
  parameterName: '',
  parameterKey: '',
  parameterValue: '',
  status: '1',
  remark: ''
})
const formRules = reactive({
  parameterName: [{ required: true, trigger: 'blur', message: '请输入参数名称' }],
  parameterKey: [{ required: true, trigger: 'blur', message: '请输入参数键名' }],
  parameterValue: [{ required: true, trigger: 'blur', message: '请输入参数键值' }],
  status: [{ required: true, trigger: 'blur', message: '请输入参数键值' }]
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
  <el-dialog v-model="visible" :title="id ? '修改参数' : '新增参数'" @close="resetForm" width="60%">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
      <div class="px-4">
        <el-form-item prop="parameterName" label="参数名称">
          <el-input v-model="formData.parameterName" placeholder="请输入参数名称" />
        </el-form-item>
        <el-form-item prop="parameterKey" label="参数键名">
          <el-input v-model="formData.parameterKey" placeholder="请输入参数键名" />
        </el-form-item>
        <el-form-item prop="parameterValue" label="参数键值">
          <el-input v-model="formData.parameterValue" placeholder="请输入参数键值" />
        </el-form-item>
        <el-form-item prop="status" label="是否启用">
          <el-radio-group v-model="formData.status" class="ml-4">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="identification" label="备注">
          <el-input v-model="formData.identification" rows="3" placeholder="请输入备注" type="textarea" />
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
