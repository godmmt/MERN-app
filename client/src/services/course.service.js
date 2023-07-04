import axios from 'axios';
const API_URL = 'http://localhost:8080/api/courses';

class CourseService {
  // method-POST新課程
  static post(title, description, price) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }
    return axios.post(
      API_URL,
      { title, description, price },
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
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }

    return axios.get(API_URL + '/findByName/' + name, {
      headers: {
        Authorization: token,
      },
    });
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
