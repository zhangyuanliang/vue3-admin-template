<script setup>
import { Search } from '@element-plus/icons-vue'
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
const emit = defineEmits(['update:visible', 'sure'])

const filterText = ref('')
const treeRef = ref()

const defaultProps = {
  children: 'children',
  label: 'label'
}

watch(filterText, (val) => {
  treeRef.value.filter(val)
})

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const data = [
  {
    id: 1,
    label: '系统管理',
    children: [
      {
        id: 4,
        label: '用户管理',
      },
      {
        id: 5,
        label: '组织管理',
      },
      {
        id: 6,
        label: '日志管理',
      },
      {
        id: 7,
        label: '字典管理',
      },
    ]
  },
  {
    id: 2,
    label: '系统监控',
    children: [
      {
        id: 8,
        label: '系统检测'
      },
      {
        id: 9,
        label: '用户监管'
      }
    ]
  },
  {
    id: 3,
    label: '系统工具',
    children: [
      {
        id: 7,
        label: '流程图'
      },
      {
        id: 8,
        label: '测试'
      }
    ]
  }
]

const getCheckedKeys = () => {
  console.log(treeRef.value.getCheckedKeys(false))
}

const handleSave = () => {
  getCheckedKeys()
  // emit('sure')
}
const resetForm = () => {
  emit('update:visible')
  filterText.value = ''
}
const handleCheckChange = (
  data,
  checked,
  indeterminate
) => {
  console.log(data, checked, indeterminate)
}
</script>

<template>
  <!-- 新增/修改 -->
  <el-dialog v-model="visible" title="菜单权限" @close="resetForm" width="60%">
    <el-form label-width="80px">
      <el-form-item label="菜单权限" required>
        <el-input v-model="filterText" :prefix-icon="Search" placeholder="搜索" clearable />
        <el-tree
          ref="treeRef"
          class="filter-tree mt-2"
          :data="data"
          node-key="id"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          show-checkbox
          @check-change="handleCheckChange"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-tree) {
  width: 100%;
}
</style>
