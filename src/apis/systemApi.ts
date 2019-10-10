import $http from './http';
import config from './config';
export default {
  name: 'system',
  getUrl(url: any) {
    return config.getUrl(this.name, url);
  },
  postLogin(data: any) {
    return $http.post(`/api/login`, data);
  },
};
