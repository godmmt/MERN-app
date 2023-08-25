import axios from '../config/axios.config.js';

class CourseService {
  // method-創立新課程
  static post({ title, subtitle, description, price, img }) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }
    return axios.post(
      'courses',
      { title, subtitle, description, price, img },
      {
        headers: {
          Authorization: token, // 從localStorage提出JWT,將JWT跟著axios一起送至server
        },
      }
    );
  }

  // method-尋找所有課程
  static getAllCourses() {
    return axios.get('courses');
  }

  // method-根據名字尋找課程
  static getCourseByName(name) {
    return axios.get(`courses/findByName/${name}`);
  }

  // method-根據講師ID找到課程
  static getCoursesByInstructorID(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }

    return axios.get(`courses/instructor/${_id}`, {
      headers: {
        Authorization: token,
        // 從localStorage提出JWT,將JWT跟著axios一起送至server
      },
    });
  }

  // method-根據學生ID找到課程
  static getCoursesByStudentID(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }

    return axios.get(`courses/student/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  // method-註冊課程
  static enroll(course_id, user_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }

    return axios.post(
      `/courses/enroll/${course_id}`, // 第一個參數:URL
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
