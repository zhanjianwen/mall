import $http from './http';
import config from './config';
export default {
  name: 'system',
  getUrl(url: any) {
    return config.getUrl(this.name, url);
  },
  postLogin(data: any) {
    return $http.post(this.getUrl(`/api/member/login`), data);
  },
  getTest(data: any) {
    return $http.get(this.getUrl(`/api/member/geetestInit?t=${(new Date()).getTime()}`), data);
  },
};
