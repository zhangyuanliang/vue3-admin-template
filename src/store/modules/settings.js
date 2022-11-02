import { defineStore } from "pinia"
import layoutSettings from "@/config/layout"

export const useSettingsStore = defineStore("settings", () => {
  const fixedHeader = ref(layoutSettings.fixedHeader)
  const showSettings = ref(layoutSettings.showSettings)
  const showTagsView = ref(layoutSettings.showTagsView)
  const showSidebarLogo = ref(layoutSettings.showSidebarLogo)
  const showThemeSwitch = ref(layoutSettings.showThemeSwitch)
  const showScreenfull = ref(layoutSettings.showScreenfull)

  return { fixedHeader, showSettings, showTagsView, showSidebarLogo, showThemeSwitch, showScreenfull }
})
