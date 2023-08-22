import axios from 'axios';
const API_URL = 'http://localhost:8080/api/courses';

class CourseService {
  // method-POST新課程
  static post({ title, subtitle, description, price }) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }
    return axios.post(
      API_URL,
      { title, subtitle, description, price },
      {
        headers: {
          Authorization: token, // 從localStorage提出JWT,將JWT跟著axios一起送至server
        },
      }
    );
  }

  static getEnrolledCourses(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }

    return axios.get(API_URL + '/student/' + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // method-根據名字尋找課程
  static getCourseByName(name) {
    // 查詢課程應該不用驗證，等要註冊enroll再驗證身分
    return axios.get(API_URL + '/findByName/' + name);
  }

  // method-尋找所有課程
  static getAllCourses() {
    return axios.get(API_URL);
  }

  // method-根據講師ID找到課程
  static get(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }

    return axios.get(API_URL + '/instructor/' + _id, {
      headers: {
        Authorization: token, // 從localStorage提出JWT,將JWT跟著axios一起送至server
      },
    });
  }

  // 註冊課程
  static enroll(_id, user_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }

    return axios.post(
      API_URL + '/enroll/' + _id, // 第一個參數:URL
      { user_id }, // 第二個參數:req.body
      {
        headers: {
          Authorization: token, // 第三個參數:設定JWT的地方
        },
      }
    );
  }
}

export default CourseService;
