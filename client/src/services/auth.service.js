import axios from '../config/axios.config.js';

class AuthService {
  static authKeys = ['accessToken', 'refreshToken', 'role', 'id'];

  static login(email, password) {
    return axios.post('user/login', { email, password });
  }

  // TODO
  // static logout() {
  //    return axios.post('user/revoke-token');
  // }

  static register(username, email, password, role) {
    return axios.post('user/register', { username, email, password, role });
  }

  static getUserInfo() {
    return axios.get('user/user-info');
  }

  static refreshToken() {
    return axios.post('user/refresh-token');
  }

  static getCurrentUser() {
    const user = {};
    AuthService.authKeys.forEach((key) => {
      const value = localStorage.getItem(key);
      user[key] = value;
    });
    return user;
  }
}

export default AuthService;
