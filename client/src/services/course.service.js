import axios from '../config/axios.config.js';

class CourseService {
  // method-創立新課程
  static post(formData) {
    return axios.post('courses', formData);
  }

  // method-尋找所有課程
  static getAllCourses() {
    return axios.get('courses');
  }

  // method-根據名字尋找課程
  static getCourseByName(name) {
    return axios.get(`courses/find_by_name/${name}`);
  }

  // method-根據講師ID找到課程
  static getCoursesByInstructorID(_id) {
    return axios.get(`courses/instructor/${_id}`);
  }

  // method-根據學生ID找到課程
  static getCoursesByStudentID(_id) {
    return axios.get(`courses/student/${_id}`);
  }

  // method-註冊課程
  static enroll(course_id, user_id) {
    return axios.post(
      `/courses/enroll/${course_id}`, // 第一個參數:URL
      { user_id } // 第二個參數:req.body
    );
  }
}

export default CourseService;
