<script setup>
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'
import path from 'path-browserify'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isCollapse: {
    type: Boolean,
    default: false
  },
  isFirstLevel: {
    type: Boolean,
    default: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

const alwaysShowRootMenu = computed(() => {
  return props.item.meta && props.item.meta.alwaysShow
})

const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      return !(item.meta && item.meta.hidden)
    })
    return showingChildren.length
  }
  return 0
})

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  return { ...props.item, path: '' }
})

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>

<template>
  <div v-if="!props.item.meta?.hidden" :class="{ 'simple-mode': props.isCollapse, 'first-level': props.isFirstLevel }">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <svg-icon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon" />
          <component v-else-if="theOnlyOneChild.meta.elIcon" :is="theOnlyOneChild.meta.elIcon" class="el-icon" />
          <template v-if="theOnlyOneChild.meta.title" #title>
            {{ theOnlyOneChild.meta.title }}
          </template>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(props.item.path)" popper-append-to-body>
      <template #title>
        <svg-icon v-if="props.item.meta && props.item.meta.svgIcon" :name="props.item.meta.svgIcon" />
        <component v-else-if="props.item.meta && props.item.meta.elIcon" :is="props.item.meta.elIcon" class="el-icon" />
        <span v-if="props.item.meta && props.item.meta.title">{{ props.item.meta.title }}</span>
      </template>
      <template v-if="props.item.children">
        <sidebar-item
          v-for="child in props.item.children"
          :key="child.path"
          :item="child"
          :is-collapse="props.isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

svg {
  display: inline-block;
}

.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.simple-mode {
  &.first-level {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
  :deep(.el-menu-item) {
    height: var(--v3-sidebar-menu-item-height);
  }
  :deep(.el-menu-item:hover) {
    background-color: var(--v3-sidebar-menu-hover-bg-color);
    color: #fff;
  }
  :deep(.el-menu-item.is-active) {
    background-color: var(--v3-sidebar-menu-active-bg-color);
  }
}
</style>
