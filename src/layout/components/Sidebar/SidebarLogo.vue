<script setup>
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
})
const name = import.meta.env.VITE_PROJECT_NAME
</script>

<template>
  <div class="sidebar-logo-container" :class="{ 'sidebar-collapse': props.collapse }">
    <transition name="sidebar-logo-fade">
      <div v-if="props.collapse" key="collapse">
        <svg-icon name="vite"/>
      </div>
      <div v-else key="expand">
        <svg-icon name="vite"/>
        <span class="title">{{ name }}</span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  display: inline-block;
}
img {
  display: inline-block;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: var(--v3-sidebarlogo-bg-color);
  text-align: center;
  overflow: hidden;
  font-size: 16px;
  color: #fff;
  .sidebar-logo {
    display: none;
  }
  .router-link-active {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .sidebar-logo-text {
    height: 50%;
    vertical-align: middle;
  }
  .title {
    margin-left: 14px;
  }
}

.sidebar-collapse {
  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .sidebar-logo-text {
    display: none;
  }
}
</style>
