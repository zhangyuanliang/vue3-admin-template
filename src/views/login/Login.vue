<template>
  <div class="login-container">
    <div class="loginbox">
      <div class="main">
        <el-form
          ref="loginFormRef"
          :model="loginFormModel"
          status-icon
          :rules="loginFormRules"
          label-width="68px"
          class="form-wrap"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginFormModel.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginFormModel.password" type="password" autocomplete="off" />
          </el-form-item>
          <div class="flex justify-center mt-6">
            <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
            <el-button @click="resetForm(loginFormRef)">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getVerifyCodeImg } from '@/api/user'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

// 获取router变量
const vueRouter = useRouter()
// 获取store变量
const userStore = useUserStore()

const loginFormRef = ref()

// 定义表单对象
const loginFormModel = reactive({
  username: '',
  password: '',
  code: '',
  uuid: '',
  codeUrl: '',
  loginButtonDisabled: false,
  loginButtonLoading: false,
  loginButtonName: '登录'
})
// 定义表单校验规则
const loginFormRules = reactive({
  username: [{ required: true, message: '请输入用户名！', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码！', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码！', trigger: 'blur' }]
})

// 获取验证码
const getVerifyCode = () => {
  getVerifyCodeImg().then((res) => {
    loginFormModel.codeUrl = 'data:image/gif;base64,' + res.img
    loginFormModel.uuid = res.uuid
  })
}

// 提交表单方法
const submitForm = (formEl) => {
  loginFormModel.loginButtonDisabled = true
  loginFormModel.loginButtonLoading = true
  loginFormModel.loginButtonName = '登录中...'
  formEl.validate((valid) => {
    if (valid) {
      userStore.loginRequest(loginFormModel)
        .then(() => {
          vueRouter.push({ path: '/home' }).catch(() => {})
        })
        .catch(() => {
          loginFormModel.loginButtonDisabled = false
          loginFormModel.loginButtonLoading = false
          loginFormModel.loginButtonName = '登录'
        })
    } else {
      loginFormModel.loginButtonDisabled = false
      loginFormModel.loginButtonLoading = false
      loginFormModel.loginButtonName = '登录'
    }
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

if (import.meta.env.DEV) {
  loginFormModel.username = 'admin'
  loginFormModel.password = '123456'
}

getVerifyCode();
</script>

<style lang="scss">
.login-container {
  height: 100%;
  width: 100%;
  min-height: 100%;
  background: #e2effc url('@/assets/image/login-bg.jpg') no-repeat center top;
  background-size: 100%;
  vertical-align: middle;
  display: flex;

  a {
    text-decoration: none;
  }
  .loginbox {
    width: 445px;
    height: 500px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
  }
  .main {
    width: 445px;
    height: 500px;
    margin: 0 auto;
    float: left;
    display: block;
    padding: 0 30px;
    position: relative;
    .form-wrap {
      margin-top: 100px;
    }
    .btns-wrap {
    }
  }
}
</style>
