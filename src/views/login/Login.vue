<template>
  <div class="login-container">
    <div class="loginbox">
      <transition name="fade" mode="out-in">
        <div v-if="!pageData.isForgetPwd" class="main">
          <div class="login-title">系统登录</div>
          <el-tabs v-model="pageData.loginActiveTab" class="mt-3">
            <el-tab-pane label="密码登录" name="password"></el-tab-pane>
            <el-tab-pane label="免密登录" name="sms"></el-tab-pane>
          </el-tabs>
          <transition name="fade" mode="out-in">
            <PasswordForm v-if="pageData.loginActiveTab === 'password'">
              <div class="flex justify-end">
                <span @click="forgotPwd" class="text-gray-500 text-sm mt-2 cursor-pointer hover:text-blue-500">
                  找回密码
                </span>
              </div>
            </PasswordForm>
            <SMSForm v-else />
          </transition>
          <div class="text-sm text-red-400 text-center mt-10">推荐使用谷歌浏览器，360浏览器。</div>
        </div>
        <div v-else class="main">
          <div class="login-title">找回密码</div>
          <el-tabs v-model="pageData.forgetActiveTab" class="mt-3">
            <el-tab-pane label="手机" name="phone"></el-tab-pane>
            <el-tab-pane label="邮箱" name="email"></el-tab-pane>
          </el-tabs>
          <transition name="fade" mode="out-in">
            <PhoneForm v-if="pageData.forgetActiveTab === 'phone'" />
            <EmailForm v-else />
          </transition>
          <div class="flex justify-end">
            <span @click="backLogin" class="text-gray-500 text-sm mt-2 cursor-pointer hover:text-blue-500">
              返回登录
            </span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user'
import PasswordForm from './components/PasswordForm.vue'
import SMSForm from './components/SMSForm.vue'
import PhoneForm from './components/PhoneForm.vue'
import EmailForm from './components/EmailForm.vue'

// 获取router变量
const vueRouter = useRouter()
// 获取store变量
const userStore = useUserStore()

const pageData = reactive({
  loginActiveTab: 'password',
  isForgetPwd: false,
  forgetActiveTab: 'phone'
})

const forgotPwd = () => {
  pageData.isForgetPwd = true
}
const backLogin = () => {
  pageData.isForgetPwd = false
}
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
    overflow: hidden;
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
