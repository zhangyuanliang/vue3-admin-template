<script setup>
import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'
import { useUserStore } from '@/store/modules/user'
import { UserFilled } from '@element-plus/icons-vue'
import Breadcrumb from '../Breadcrumb/index.vue'
import Hamburger from '../Hamburger/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const router = useRouter()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

const sidebar = computed(() => {
  return appStore.sidebar
})
const showThemeSwitch = computed(() => {
  return settingsStore.showThemeSwitch
})
const showScreenfull = computed(() => {
  return settingsStore.showScreenfull
})

const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}
const logout = () => {
  userStore.logout()
  router.push('/login')
}

const isDark = useDark({
  // selector: 'body',
  // attribute: 'color-scheme',
  // valueDark: 'dark',
  // valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="navigation-bar">
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
    <Breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <div @click="toggleDark()" class="right-menu-item flex items-center">
        <el-icon>
          <Sunny v-if="isDark"/>
          <Moon v-else/>
        </el-icon>
      </div>
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <div>
          <el-avatar :icon="UserFilled" :size="26" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  // background: #fff;
  border-bottom: 1px solid #e5e5e5;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
  }
  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      &:hover {
        background: #e5e5e5;
      }
    }
  }
}
</style>
