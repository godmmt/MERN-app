import axios from 'axios';
const API_URL = 'http://localhost:8080/api/user'; //最基本的URL

class AuthService {
  //JS的class可以創造很多物件//AuthService可以有很多methods
  login(email, password) {
    return axios.post(API_URL + '/login', { email, password });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(username, email, password, role) {
    return axios.post(API_URL + '/register', {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  } //目前正在使用網頁的人是誰
}

export default new AuthService(); //因AuthService是一個class 這裡直接幫這個class做一個物件出來
