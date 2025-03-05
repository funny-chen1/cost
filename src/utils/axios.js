import axios from "axios";

axios.defaults.baseURL = 'http://172.18.3.125:7009/'

// 是否允许携带cookie
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (!config.url.includes('deepseek')) {
        config.headers["Content-Type"] = "multipart/form-data";
        if (token) {
            config.headers.Authorization = token
        }
    }
  // config.headers["Content-Type"] = "application/json";
  return config;
});

axios.interceptors.response.use(
  (res) => {
    const code = res.status;
    if (code !== 200) {
        console.log('error');
    }
    return res.data;
  },
  (error) => {
    console.log('error');
    return Promise.reject(error);
  }
);

export default axios;
