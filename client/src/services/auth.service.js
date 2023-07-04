import axios from 'axios';
const API_URL = 'http://localhost:8080/api/user'; //最基本的URL

//JS的class可以創造很多物件
class AuthService {
  //AuthService可以有很多methods
  static login(email, password) {
    return axios.post(API_URL + '/login', { email, password });
  }

  static logout() {
    localStorage.removeItem('user');
  }

  static register(username, email, password, role) {
    return axios.post(API_URL + '/register', {
      username,
      email,
      password,
      role,
    });
  }

  //目前正在使用網頁的人是誰
  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default AuthService;
