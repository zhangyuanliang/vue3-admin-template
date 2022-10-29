<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="container">
      <div class="loginbox">
        <div class="main">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="Password" prop="pass">
              <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
              <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Age" prop="age">
              <el-input v-model.number="ruleForm.age" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
              <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getVerifyCodeImg } from '@/api/user';
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

// 获取router变量
const vueRouter = useRouter();
// 获取store变量
const vueStore = useUserStore();

const loginFormRef = ref();
// 定义表单对象
const loginFormModel = reactive({
  username: 'admin',
  password: 'admin123',
  code: '',
  uuid: '',
  codeUrl: '',
  loginButtonDisabled: false,
  loginButtonLoading: false,
  loginButtonName: '登录',
});
// 定义表单校验规则
const loginFormRules = reactive({
  username: [{ required: true, message: '请输入用户名！', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码！', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码！', trigger: 'blur' }],
});

// 获取验证码
const getVerifyCode = () => {
  getVerifyCodeImg().then((res) => {
    loginFormModel.codeUrl = 'data:image/gif;base64,' + res.img;
    loginFormModel.uuid = res.uuid;
  });
};

// 提交表单方法
// const submitForm = () => {
//   loginFormModel.loginButtonDisabled = true;
//   loginFormModel.loginButtonLoading = true;
//   loginFormModel.loginButtonName = '登录中...';
//   loginFormRef.value
//     .validate()
//     .then(() => {
//       vueStore
//         .dispatch('Login_Action', loginFormModel)
//         .then(() => {
//           // 登陆成功，跳转到主页
//           vueRouter.push({ path: '/home' }).catch(() => {});
//         })
//         .catch(() => {
//           loginFormModel.loginButtonDisabled = false;
//           loginFormModel.loginButtonLoading = false;
//           loginFormModel.loginButtonName = '登录';
//         });
//     })
//     .catch((error) => {
//       loginFormModel.loginButtonDisabled = false;
//       loginFormModel.loginButtonLoading = false;
//       loginFormModel.loginButtonName = '登录';
//       console.log('error', error);
//     });
// };
// // 重置表单方法
// const resetForm = () => {
//   loginFormRef.value.resetFields();
// };

// 默认调用获取验证码方法
// getVerifyCode();



const ruleFormRef = ref({})

const checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less"></style>
