import axios from "axios";
import store from "../store";
import router from "../router";
// 创建axios实例
const config = {
    proxy: 'http://192.168.0.8:8081' // 代理配置
}
const service = axios.create({
  baseURL: process.env.VUE_APP_URL, // api 的 VUE_APP_URL
  timeout: 50000, // 请求超时时间(因为需要调试后台,所以设置得比较大)
    withCredentials: true //跨域处理
});

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
  config => {
    if (store.state.token) {
      // 给请求头添加laohu-token
      config.headers["user-token"] = store.state.token;
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器,数据返回后进行一些处理
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code == "666") {
      return res;
    } else if (res.code == "603") {
      // code为603代表token已经失效,
      // 提示用户,然后跳转到登陆页面
      router.push("/login");
    } else {
      Promise.reject(res.msg);
    }
  },
  error => {
    Promise.reject("网络异常");
  }
);
// 解析参数
const formatParams = (method = 'GET', params) => {
    // headers配置
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        changeOrigin: true
    }
    switch (method) {
        case 'POST':
            return {
                headers,
                method,
                data: params
            }
        case 'PUT':
            return {
                headers,
                method,
                data: params
            }
        case 'DELETE':
            return {
                headers,
                method
            }
        case 'GET':
            return {
                headers,
                method
            }
        default:
            return {
                headers,
                method,
                params
            }
    }
}
export { service, formatParams, config }
