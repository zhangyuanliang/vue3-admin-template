import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getToken } from '@/utils/auth';
import { useUserStore } from '@/store/modules/user';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN, // api的base_url
  timeout: 8000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken();
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      ElMessage({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000,
      });

      if (res.code === 401) {
        ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const userStore = useUserStore();
          userStore.dispatch('FedLogOut').then(() => {
            router.push({ path: '/login' });
            // location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      if (res.code === 500) {
        ElMessage({
          message: res.msg,
          type: 'warning',
          duration: 5 * 1000,
        });
      }
      return Promise.reject('error');
    } else {
      return response.data;
    }
  },
  (error) => {
    ElMessage({
      message: error.msg ? error.msg : '请求失败，请检查网络状况',
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
