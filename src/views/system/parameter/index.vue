<script setup>
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, queryParameter } from '@/api/system/parameter'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, Delete } from '@element-plus/icons-vue'
import { usePagination } from '@/hooks/usePagination'
import AddParameter from './components/AddParameter.vue'

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
  ElMessageBox.confirm(
    `正在删除用户：${row.realName}，确认删除？`,
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(() => {
    deleteTableDataApi(row.id).then(() => {
      ElMessage.success('删除成功')
      getTableData()
    })
  })
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
  queryParameter({
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
    <div shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="参数名称">
          <el-input v-model="searchData.username" placeholder="请输入参数名称" />
        </el-form-item>
        <el-form-item prop="phone" label="参数键名">
          <el-input v-model="searchData.phone" placeholder="请输入参数键名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" plain :icon="Plus" @click="pageData.isShowAddDialog = true">新增</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" max-height="64vh">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="realName" label="参数名称" align="center" />
          <el-table-column prop="roleName" label="参数键名" align="center" />
          <el-table-column prop="phonenumber" label="参数键值" align="center" />
          <el-table-column prop="email" label="是否启用" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
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
    <AddParameter v-model:visible="pageData.isShowAddDialog" :id="pageData.editingId" @create="createUser" @update="updateUser" />
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
