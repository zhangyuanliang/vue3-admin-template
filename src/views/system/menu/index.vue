<script setup>
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, queryMenu } from '@/api/system/menu'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { usePagination } from '@/hooks/usePagination'
import AddMenu from './components/AddMenu.vue'

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const pageData = reactive({
  isShowAddDialog: false,
  editingId: ''
})

const createUser = (record) => {
  createTableDataApi({
    username: record.username,
    password: record.password
  }).then(() => {
    ElMessage.success('新增成功')
    pageData.isShowAddDialog = false
    getTableData()
  })
}

const updateUser = (record) => {
  updateTableDataApi({
    id: pageData.editingId,
    username: record.username
  }).then(() => {
    ElMessage.success('修改成功')
    pageData.isShowAddDialog = false
    getTableData()
  })
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`正在删除用户：${row.realName}，确认删除？`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteTableDataApi(row.id).then(() => {
      ElMessage.success('删除成功')
      getTableData()
    })
  })
}

const handleCreate = (row) => {
  pageData.editingId = row.id
  pageData.isShowAddDialog = true
}

const handleUpdate = (row) => {
  pageData.editingId = row.id
  pageData.isShowAddDialog = true
}

const tableData = ref([])
const searchFormRef = ref()
const searchData = reactive({
  username: '',
  phone: ''
})
const getTableData = () => {
  loading.value = true
  queryMenu({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    username: searchData.username || undefined,
    phone: searchData.phone || undefined
  })
    .then((res) => {
      paginationData.total = res.data.total
      tableData.value = res.data.records
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}

watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <div v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" plain :icon="Plus" @click="pageData.isShowAddDialog = true">新增顶级菜单</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" row-key="id" default-expand-all>
          <el-table-column prop="name" label="菜单名称" />
          <el-table-column prop="type" label="菜单类型" />
          <el-table-column prop="sort" label="显示顺序" />
          <el-table-column prop="authCharacter" label="权限字符" />
          <el-table-column fixed="right" label="操作" width="220">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleCreate(scope.row)">新增</el-button>
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex justify-end">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :small="true"
        />
      </div>
    </div>
    <AddMenu
      v-model:visible="pageData.isShowAddDialog"
      :id="pageData.editingId"
      @create="createUser"
      @update="updateUser"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  :deep(.el-button) {
    padding: 6px 12px;
  }
}

.table-wrapper {
  margin-bottom: 20px;
}
</style>
