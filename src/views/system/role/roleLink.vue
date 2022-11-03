<script setup>
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, queryDictionaryValue } from '@/api/system/dictionary.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { usePagination } from '@/hooks/usePagination'

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

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

const tableData = ref([])
const searchFormRef = ref()
const searchData = reactive({
  dicName: '',
  dicType: '',
  status: '',
})
const getTableData = () => {
  loading.value = true
  queryDictionaryValue({
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
        <el-form-item prop="dicName" label="用户账号">
          <el-input v-model="searchData.dicName" placeholder="请输入用户账号" />
        </el-form-item>
        <el-form-item prop="dicName" label="真实姓名">
          <el-input v-model="searchData.dicName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">

      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" max-height="64vh">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="dicName" label="用户账号" align="center" />
          <el-table-column prop="dicValue" label="真实姓名" align="center" />
          <el-table-column prop="sort" label="所属组织" align="center" />
          <el-table-column prop="status" label="状态" align="center" />
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
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.table-wrapper {
  margin-bottom: 20px;
}
</style>
