import store from "@/store"
import { usePermissionStore } from "./permission"
import { getToken, removeToken, setToken } from "@/utils/auth"
import router, { resetRouter } from "@/router"
import { login, getInfo } from '@/api/user'

export const useUserStore = defineStore("user", () => {
  const token = ref(getToken() || "")
  const roles = ref([])

  const setRoles = (value) => {
    roles.value = value
  }

  const loginRequest = (loginData) => {
    return new Promise((resolve, reject) => {
      login({
        username: loginData.username,
        password: loginData.password,
        code: loginData.code
      })
        .then((res) => {
          setToken(res.token)
          token.value = res.token
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const queryUserInfo = () => {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((res) => {
          roles.value = res.roles
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const changeRoles = async (role) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    await getInfo()
    const permissionStore = usePermissionStore()
    permissionStore.setRoutes(roles.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item) => {
      router.addRoute(item)
    })
  }

  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
  }

  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  return { token, roles, setRoles, loginRequest, queryUserInfo, changeRoles, logout, resetToken }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
