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
const options = [
  {
    value: '1',
    label: '正常'
  },
  {
    value: '0',
    label: '停用'
  }
]

const formRef = ref()
const formData = reactive({
  dicName: '',
  dicType: '',
  dicStatus: ''
})
const formRules = reactive({
  dicName: [{ required: true, trigger: 'blur', message: '请输入字典名称！' }],
  dicType: [{ required: true, trigger: 'blur', message: '请输入字典类型！' }],
  dicStatus: [{ required: true, trigger: 'blur', message: '请选择状态！' }]
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
  formRef.value?.resetFields()
  emit('update:visible')
}
</script>

<template>
  <el-dialog v-model="visible" :title="id ? '修改字典' : '新增字典'" @close="resetForm" width="60%">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
      <div class="px-4">
        <el-form-item prop="dicName" label="字典名称">
          <el-input v-model="formData.dicName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item prop="dicType" label="字典类型">
          <el-input v-model="formData.dicType" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item prop="dicStatus" label="状态">
          <el-select v-model="formData.dicStatus" placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
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
