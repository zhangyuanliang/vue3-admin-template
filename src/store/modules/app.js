import { reactive, ref } from "vue"
import { defineStore } from "pinia"
import { getSidebarStatus, setSidebarStatus } from "@/utils/localStorage"

export const useAppStore = defineStore("app", () => {
  const sidebar = reactive({
    opened: getSidebarStatus() !== "closed",
    withoutAnimation: false
  })

  const toggleSidebar = (withoutAnimation) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
    if (sidebar.opened) {
      setSidebarStatus("opened")
    } else {
      setSidebarStatus("closed")
    }
  }
  const closeSidebar = (withoutAnimation) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus("closed")
  }

  return { sidebar, toggleSidebar, closeSidebar }
})
