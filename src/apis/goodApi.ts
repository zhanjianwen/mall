import $http from './http';
import config from './config';
export default {
  name: 'system',
  getUrl(url: any) {
    return config.getUrl(this.name, url);
  },
  postAddCart(data: any) {
    return $http.post(this.getUrl(`/api/member/addCart`), data);
  },
};
