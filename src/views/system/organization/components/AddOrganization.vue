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
  orgName: '',
  username: '',
  orgType: '',
  status: ''
})
const formRules = reactive({
  orgName: [{ required: true, trigger: 'blur', message: '请输入组织名称！' }]
})
const options = [
  {
    value: '1',
    label: '机构'
  },
  {
    value: '2',
    label: '部门'
  }
]
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
}
</script>

<template>
  <!-- 新增/修改 -->
  <el-dialog v-model="visible" :title="id ? '修改组织' : '新增组织'" @close="resetForm" width="60%">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="orgName" label="组织名称">
            <el-input v-model="formData.orgName" placeholder="请输入组织名称" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <el-form-item prop="orgType" label="组织类型">
            <el-select v-model="formData.orgType" placeholder="请选择组织类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="username" label="联系人">
            <el-input v-model="formData.username" placeholder="请输入联系人" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <el-form-item prop="role" label="联系电话">
            <el-input v-model="formData.role" placeholder="请选择联系电话" />
          </el-form-item>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="identification" label="显示顺序">
            <el-input v-model="formData.identification" placeholder="请输入显示顺序" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <el-form-item prop="status" label="状态">
            <el-radio-group v-model="formData.status" class="ml-4">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">停用</el-radio>
            </el-radio-group>
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
