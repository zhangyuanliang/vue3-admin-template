<script setup>
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
    <transition name="sidebar-logo-fade">
      <div v-if="props.collapse" key="collapse">
        <img src="/vite.svg" class="sidebar-logo" />
      </div>
      <div v-else key="expand">
        <img src="/vite.svg" class="sidebar-logo-text" />
        <span>Element vite3</span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
img {
  display: inline-block;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  padding: 0 10px;
  line-height: var(--v3-header-height);
  background-color: var(--v3-sidebarlogo-bg-color);
  text-align: center;
  overflow: hidden;
  font-size: 20px;
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
    height: 60%;
    vertical-align: middle;
    margin-right: 10px;
  }
}

.collapse {
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
