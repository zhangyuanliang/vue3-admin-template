<template>
  <div class="login-container">
    <div class="loginbox">
      <div class="main">
        <div class="login-title">系统登录</div>
        <el-tabs v-model="activeTab" class="mt-3" @tab-click="handleClick">
          <el-tab-pane label="密码登录" name="password"></el-tab-pane>
          <el-tab-pane label="免密登录" name="sms"></el-tab-pane>
        </el-tabs>
        <transition name="fade" mode="out-in">
          <PasswordForm v-if="activeTab === 'password'"/>
          <SMSForm v-else/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { User, Lock } from '@element-plus/icons-vue'
import PasswordForm from './components/PasswordForm.vue'
import SMSForm from './components/SMSForm.vue'

// 获取router变量
const vueRouter = useRouter()
// 获取store变量
const userStore = useUserStore()

const activeTab = ref('sms')

</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  min-height: 100%;
  background: #e2effc url('@/assets/image/login-bg.jpg') no-repeat center top;
  background-size: 100%;
  vertical-align: middle;
  display: flex;
  .login-title {
    margin-top: 40px;
    color: #000000d9;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .loginbox {
    width: 445px;
    height: 500px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
  }
  .main {
    width: 445px;
    height: 500px;
    margin: 0 auto;
    float: left;
    display: block;
    padding: 0 30px;
    position: relative;
    .form-wrap {
      margin-top: 20px;
    }
    .btns-wrap {
    }
  }
  :deep(.el-button) {
    font-size: 16px;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }

  :deep(.el-input) {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
  :deep(.el-input__prefix .el-input__icon) {
    color: var(--el-color-primary);
  }
  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
  }
}
</style>
