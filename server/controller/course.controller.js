import { CourseModel } from '../models/index.js';
import sendResponse from '../utils/sendResponse.js';

class CourseController {
  // 搜尋所有課程
  static getCourses = async (req, res, next) => {
    try {
      const course = await CourseModel.find({}).populate('instructor', ['username', 'email']);

      sendResponse({
        res,
        status: 200,
        value: course,
      });
    } catch (err) {
      next(err);
    }
  };

  // 以課程名稱搜尋課程
  static getCoursesByCourseName = async (req, res, next) => {
    try {
      const { name } = req.params;
      const course = await CourseModel.find({ title: name }).populate('instructor', ['username', 'email']);

      sendResponse({
        res,
        status: 200,
        value: course,
      });
    } catch (err) {
      next(err);
    }
  };

  // 根據講師ID獲得課程內容
  static getCoursesByInstructorID = async (req, res) => {
    try {
      const { _instructor_id } = req.params;
      const course = await CourseModel.find({ instructor: _instructor_id }).populate('instructor', ['username', 'email']);
      sendResponse({
        res,
        status: 200,
        value: course,
      });
    } catch (err) {
      next(err);
    }
  };

  // 根據學生ID獲得課程內容
  static getCoursesByStudentID = async (req, res) => {
    try {
      const { _student_id } = req.params;
      const courses = await CourseModel.find({ students: _student_id }).populate('instructor', ['username', 'email']);
      sendResponse({
        res,
        status: 200,
        value: courses,
      });
    } catch (err) {
      next(err);
    }
  };

  // 根據課程ID來找到課程內容
  static getCourse = (req, res) => {
    try {
      const { _id } = req.params;
      const course = CourseModel.findOne({ _id }).populate('instructor', ['email']);
      sendResponse({
        res,
        status: 200,
        value: course,
      });
    } catch (err) {
      next(err);
    }
  };

  // 新增課程
  static createCourse = async (req, res, next) => {
    try {
      const { title, subtitle, description, price } = req.body;
      const newCourse = new CourseModel({
        title,
        subtitle,
        description,
        price,
        instructor: req.user._id,
        img: req.imgURL,
      });
      await newCourse.save();
      sendResponse({
        res,
        status: 200,
        message: 'Course created successfully.',
      });
    } catch (err) {
      next(err);
    }
  };

  // 編輯課程
  static editCourse = async (req, res, next) => {
    try {
      const { _id } = req.params;

      // 檢查是否有該課程存在
      const course = await CourseModel.findOne({ _id });
      if (!course) {
        return sendResponse({
          res,
          status: 400,
          message: 'Course not found.',
        });
      }

      // 檢查身分是否為該開課講師
      if (!course.instructor.equals(req.user._id)) {
        return sendResponse({
          res,
          status: 403,
          message: 'Only the instructor who created the course has editing permission.',
        });
      }

      const newCourse = { ...req.body, img: req.imgURL };
      await CourseModel.findOneAndUpdate({ _id }, newCourse, {
        new: true,
        runValidators: true,
      });
      sendResponse({
        res,
        status: 200,
        message: 'Course updated successfully.',
      });
    } catch (err) {
      next(err);
    }
  };

  // 刪除課程
  static deleteCourse = async (req, res, next) => {
    try {
      const { _id } = req.params;

      // 檢查是否有該課程存在
      const course = await CourseModel.findOne({ _id });
      if (!course) {
        return sendResponse({
          res,
          status: 400,
          message: 'Course not found.',
        });
      }

      // 檢查身分是否為該開課講師
      if (!course.instructor.equals(req.user._id)) {
        return sendResponse({
          res,
          status: 403,
          message: 'Only the instructor who created the course has deleting permission.',
        });
      }

      await CourseModel.deleteOne({ _id });
      sendResponse({
        res,
        status: 200,
        message: 'Course deleted successfully.',
      });
    } catch (err) {
      next(err);
    }
  };

  // 學生註冊課程
  static enrollCourse = async (req, res, next) => {
    try {
      const { course_id } = req.params;
      const { user_id } = req.body;

      const course = await CourseModel.findOne({ _id: course_id });

      // 檢查學生是否已註冊過
      if (course.students.includes(user_id)) {
        return sendResponse({
          res,
          status: 400,
          message: 'You have already registered for the course.',
        });
      }

      course.students.push(user_id);
      await course.save();
      sendResponse({
        res,
        status: 200,
        message: 'Enroll successfully.',
      });
    } catch (err) {
      next(err);
    }
  };
}

export default CourseController;
