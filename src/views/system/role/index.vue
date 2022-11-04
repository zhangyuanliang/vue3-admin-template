<script setup>
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, queryRole } from '@/api/system/role.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { usePagination } from '@/hooks/usePagination'
import AddRole from './components/AddRole.vue'
import MenuAuthority from './components/MenuAuthority.vue'

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const pageData = reactive({
  editingId: '',
  isShowAddDialog: false,
  isShowAuthorityDialog: false
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

const handleUpdate = (row) => {
  pageData.editingId = row.id
  pageData.isShowAddDialog = true
}

const tableData = ref([])
const searchFormRef = ref()
const searchData = reactive({
  dicName: '',
  dicType: '',
  status: ''
})
const getTableData = () => {
  loading.value = true
  queryRole({
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
const handleMenuAuthority = (row) => {
  pageData.editingId = row.id
  pageData.isShowAuthorityDialog = true
}

const updateAuthority = () => {
  pageData.isShowAuthorityDialog = false
}

watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <div shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="dicName" label="角色名称">
          <el-input v-model="searchData.dicName" placeholder="请输入字典名称" />
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
          <el-button type="primary" plain :icon="Plus" @click="pageData.isShowAddDialog = true">新增角色</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" max-height="64vh">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="roleName" label="角色名称" align="center">
            <template #default="scope">
              <router-link to="roleLink" class="text-blue-600">{{ scope.row.roleName }}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="roleType" label="权限字符" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="!scope.row.status" type="success" effect="plain">启用</el-tag>
              <el-tag v-else type="danger" effect="plain">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="250" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
              <el-button type="primary" text bg size="small" @click="handleMenuAuthority(scope.row)">
                菜单权限
              </el-button>
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
    <AddRole
      v-model:visible="pageData.isShowAddDialog"
      :id="pageData.editingId"
      @create="createUser"
      @update="updateUser"
    />
    <MenuAuthority v-model:visible="pageData.isShowAuthorityDialog" :id="pageData.editingId" @sure="updateAuthority" />
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
.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  :deep(.el-button) {
    padding: 6px 12px;
  }
}
</style>
