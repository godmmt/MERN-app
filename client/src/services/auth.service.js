import axios from '../config/axios.config.js';

class AuthService {
  static login(email, password) {
    return axios.post('user/login', { email, password });
  }

  static logout() {
    localStorage.removeItem('user');
    return axios.post('user/revoke-token');
  }

  static register(username, email, password, role) {
    return axios.post('user/register', { username, email, password, role });
  }

  static refreshToken() {
    return axios.post('user/refresh-token');
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default AuthService;
