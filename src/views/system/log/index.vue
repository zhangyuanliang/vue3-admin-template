<script setup>
import { queryLog } from '@/api/system/log'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { usePagination } from '@/hooks/usePagination'

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const options = [
  {
    value: '成功',
    label: '1'
  },
  {
    value: '失败',
    label: '0'
  }
]

const tableData = ref([])
const searchFormRef = ref()
const searchData = reactive({
  username: '',
  phone: ''
})
const getTableData = () => {
  loading.value = true
  queryLog({
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
        <el-form-item prop="username" label="用户名称">
          <el-input v-model="searchData.username" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item prop="username" label="状态">
          <el-select v-model="searchData.status" placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
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
        <el-table :data="tableData">
          <el-table-column type="selection" min-width="50" align="center" />
          <el-table-column prop="realName" min-width="120" label="用户名称" align="center" />
          <el-table-column prop="system" min-width="120" label="操作系统" align="center" />
          <el-table-column prop="browser" min-width="120" label="浏览器" align="center" />
          <el-table-column prop="browserVersion" min-width="220" label="浏览器版本" align="center" />
          <el-table-column prop="ip" min-width="150" label="IP地址" align="center" />
          <el-table-column prop="status" min-width="150" label="操作状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain">成功</el-tag>
              <el-tag v-else type="danger" effect="plain">失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operation" min-width="150" label="操作信息" align="center" />
          <el-table-column prop="createTime" min-width="160" label="操作日期" align="center" />
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

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}
</style>
