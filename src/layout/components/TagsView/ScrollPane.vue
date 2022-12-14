<script setup>
import { ElScrollbar } from "element-plus"
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue"

const scrollbarRef = ref()
const scrollbarContentRef = ref()

/** 当前滚动条距离左边的距离 */
let currentScrollLeft = 0
/** 每次滚动距离 */
const translateDistance = 200

// TagsView满，新增标签滚动到最右侧
const srollToLast = () => {
  nextTick(() => {
    const scrollbarContentRefWidth = scrollbarContentRef.value.clientWidth
    const scrollbarRefWidth = scrollbarRef.value.wrap$.clientWidth
    const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft
    if (scrollbarRefWidth > scrollbarContentRefWidth) return
    const scrollLeft = currentScrollLeft + lastDistance
    scrollbarRef.value.setScrollLeft(scrollLeft)
  })
}

const scroll = ({ scrollLeft }) => {
  currentScrollLeft = scrollLeft
}

const scrollTo = (direction) => {
  let scrollLeft = 0
  /** 可滚动内容的长度 */
  const scrollbarContentRefWidth = scrollbarContentRef.value.clientWidth
  /** 滚动可视区宽度 */
  const scrollbarRefWidth = scrollbarRef.value.wrap$.clientWidth
  /** 最后剩余可滚动的宽度 */
  const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft
  // 没有横向滚动条，直接结束
  if (scrollbarRefWidth > scrollbarContentRefWidth) return
  if (direction === "left") {
    scrollLeft = Math.max(0, currentScrollLeft - translateDistance)
  } else {
    scrollLeft = Math.min(currentScrollLeft + translateDistance, currentScrollLeft + lastDistance)
  }
  scrollbarRef.value.setScrollLeft(scrollLeft)
}
defineExpose({
  srollToLast
})
</script>

<template>
  <div class="scroll-container">
    <el-icon class="arrow left" @click="scrollTo('left')">
      <ArrowLeft />
    </el-icon>
    <el-scrollbar ref="scrollbarRef" @scroll="scroll">
      <div ref="scrollbarContentRef" class="scrollbar-content">
        <slot />
      </div>
    </el-scrollbar>
    <el-icon class="arrow right" @click="scrollTo('right')">
      <ArrowRight />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  user-select: none;
  display: flex;
  justify-content: space-between;
  .arrow {
    width: 40px;
    height: 100%;
    cursor: pointer;
    &.left {
      box-shadow: 5px 0 5px -6px #ccc;
    }
    &.right {
      box-shadow: -5px 0 5px -6px #ccc;
    }
  }
  .el-scrollbar {
    flex: 1;
    // 横向超出窗口长度时，显示滚动条
    white-space: nowrap;
    .scrollbar-content {
      display: inline-block;
    }
  }
}
</style>
