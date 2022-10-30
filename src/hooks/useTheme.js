import { ref } from "vue"
import { getActiveThemeName, setActiveThemeName } from "@/utils/localStorage"

/** 主题列表 */
const themeList = [
  {
    title: "默认",
    name: "normal"
  },
  {
    title: "黑暗",
    name: "dark"
  },
  {
    title: "深蓝",
    name: "dark-blue"
  }
]

/** 正在应用的主题名称 */
const activeThemeName = ref(getActiveThemeName() || "normal")

const initTheme = () => {
  setHtmlClassName(activeThemeName.value)
}

const setTheme = (value) => {
  activeThemeName.value = value
  setHtmlClassName(activeThemeName.value)
  setActiveThemeName(activeThemeName.value)
}

/** 在 html 根元素上挂载 class */
const setHtmlClassName = (value) => {
  document.documentElement.className = value
}

/** 主题 hook */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
