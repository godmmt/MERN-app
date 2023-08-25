import _axios from 'axios';
import AuthService from 'services/auth.service';

// axios 實例
const axios = _axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_HOST}/api`,
});

// request 攔截器（發request前）
axios.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    let token = '';
    if (user) {
      token = JSON.parse(localStorage.getItem('user')).token;
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 攔截器（接到response後）
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      // Unauthorized
      case 401: {
        // call refresh token
        if (!error.config.url.include('user/refresh-token')) {
          // 原本的 request 資訊
          // const originialRequest = error.config;

          // 依據 refreshToken 刷新 accessToken 並重發 request
          return AuthService.refreshToken();
        }
        break;
      }
      case 403: // Forbidden
      case 500: // Internal Server Error
        // localStorage.removeItem('token');
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

export default axios;
