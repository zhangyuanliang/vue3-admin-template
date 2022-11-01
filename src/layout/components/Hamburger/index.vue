<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits()

const toggleClick = () => {
  emit("toggle-click")
}
</script>

<template>
  <div @click="toggleClick">
    <el-icon :size="20" class="icon">
      <svg-icon v-if="props.isActive" name="menu-fold"/>
      <svg-icon v-else name="menu-expand"/>
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>
