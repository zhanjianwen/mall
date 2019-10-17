import axios from 'axios';
import moment from 'moment';
import NProgress from 'nprogress';
// import qs from 'qs';
// axios.defaults.baseURL='http://xmall.exrick.cn';
NProgress.configure({ showSpinner: false });
NProgress.configure({ parent: '#app' });
axios.interceptors.request.use((config) => {
  config.headers = {
    'Content-Type': 'application/json;charset=utf-8',
  };
  console.log(config);
  return config;
}, (error) => {
  return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
  NProgress.done();
  if (response.status === 200) {
    return response.data;
  } else {
    throw Error(response.data.msg || '服务异常');
  }
}, (error) => {
  return Promise.reject(error);
});
const ajax: any = (url: any, data: any, method: any, options: any, nprogress: any) => {
  if (options === undefined) {
    options = {};
  }
  options.url = url;
  options.data = data;
  options.method = method;
  options.withCredentials = true;
  options.nprogress = nprogress;
  if (options.nprogress && options.nprogress.NProgress) {
    NProgress.start();
  }
  return axios(options).catch((error) => {
    return {
      data: {
        isSucc: false,
        statusCode: 500,
        message: error.message,
      },
    };
  }).then((response) => {
    return response;
  });
};
const get: any = (url: any, options: any, nprogress: any) => {
  if (options === undefined) {
    options = {};
  }
  return ajax(url, options.data !== undefined ? {
    data: options.data,
  } : '', 'get', options, nprogress);
};
const post: any = (url: any, data: any, options: any, nprogress: any) => {
  if (options === undefined) {
    options = {};
  }
  for (const d in data) {
    if (data[d] instanceof Date) {
      data[d] = moment(data[d]).format('YYYY-MM-DD HH:mm:ss');
    }
  }
  return ajax(url, data, 'post', options, nprogress);
};

export default {
  ajax,
  get,
  post,
};
