import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getToken } from '@/utils/auth';
import { useUserStore } from '@/store/user';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.BASE_API : null, // api的base_url
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
    /**
     * code为非A00000是抛错
     */
    const res = response.data;
    if (res.code !== 403) {
      ElMessage({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000,
      });

      //  A00004: 未登录或Token 过期了; A00002: 系统繁忙，此结果一般表示系统有错，需开发人员解决
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
      // A00003:业务错误
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

// import axios from 'axios'
// import router from '@/router'
// import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
// import { getToken, setToken } from '@/utils/auth'
// import { useUserStore } from '@/store/user'
// let reqConfig
// let loadingE

// const service = axios.create()

// // 请求拦截
// service.interceptors.request.use(
//   (request) => {
//     console.log('request', request)
//     // token setting
//     request.headers['AUTHORIZE_TOKEN'] = getToken()
//     /* download file*/
//     if (request.isDownLoadFile) {
//       request.responseType = 'blob'
//     }
//     /* upload file*/
//     if (request.isUploadFile) {
//       request.headers['Content-Type'] = 'multipart/form-data'
//     }
//     reqConfig = request
//     if (request.bfLoading) {
//       loadingE = ElLoading.service({
//         lock: true,
//         text: '数据载入中',
//         // spinner: 'el-icon-ElLoading',
//         background: 'rgba(0, 0, 0, 0.1)'
//       })
//     }
//     /*
//      *params会拼接到url上
//      * */
//     if (request.isParams) {
//       request.params = request.data
//       request.data = {}
//     }
//     return request
//   },
//   (err) => {
//     Promise.reject(err)
//   }
// )
// // 响应拦截
// service.interceptors.response.use(
//   (res) => {
//     if (reqConfig.afHLoading && loadingE) {
//       loadingE.close()
//     }
//     // 如果是下载文件直接返回
//     if (reqConfig.isDownLoadFile) {
//       return res
//     }
//     const { flag, msg, isNeedUpdateToken, updateToken, code } = res.data
//     //更新token保持登录状态
//     if (isNeedUpdateToken) {
//       setToken(updateToken)
//     }
//     const successCode = '0,200,20000'
//     if (successCode.includes(code)) {
//       return res.data
//     } else {
//       if (code === 403) {
//         ElMessageBox.confirm('请重新登录', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           const userStore = useUserStore()
//           userStore.resetState().then(() => {
//             router.push({ path: '/login' })
//           })
//         })
//       }
//       if (reqConfig.isAlertErrorMsg) {
//         ElMessage({
//           message: msg,
//           type: 'error',
//           duration: 2 * 1000
//         })
//       }
//       //返回错误信息
//       //如果未catch 走unhandledrejection进行收集
//       //注：如果没有return 则，会放回到请求方法中.then ,返回的res为 undefined
//       return Promise.reject(res.data)
//     }
//   },
//   (err) => {
//     /*http错误处理，处理跨域，404，401，500*/
//     if (loadingE) loadingE.close()
//     ElMessage({
//       message: err,
//       type: 'error',
//       duration: 2 * 1000
//     })
//     //如果是跨域
//     //Network Error,cross origin
//     const errObj = {
//       msg: err.toString(),
//       reqUrl: reqConfig.baseURL + reqConfig.url,
//       params: reqConfig.isParams ? reqConfig.params : reqConfig.data
//     }
//     return Promise.reject(JSON.stringify(errObj))
//   }
// )

// export function request({
//   url,
//   data,
//   method,
//   isParams,
//   bfLoading,
//   afHLoading,
//   isUploadFile,
//   isDownLoadFile,
//   baseURL,
//   timeout,
//   isAlertErrorMsg = true
// }) {
//   return service({
//     url: url,
//     method: method ?? 'get',
//     data: data ?? {},
//     isParams: isParams ?? false,
//     bfLoading: bfLoading ?? false,
//     afHLoading: afHLoading ?? true,
//     isUploadFile: isUploadFile ?? false,
//     isDownLoadFile: isDownLoadFile ?? false,
//     isAlertErrorMsg: isAlertErrorMsg,
//     baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL,
//     timeout: timeout ?? 15000
//   })
// }

// export default request
