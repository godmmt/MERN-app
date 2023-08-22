import { CourseModel } from '../models/index.js';
import { courseValidation } from '../validation.js';

class CourseController {
  // method - 搜尋所有課程
  static getCourses = (req, res) => {
    CourseModel.find({})
      .populate('instructor', ['username', 'email'])
      .then((course) => {
        res.status(200).send(course);
      })
      .catch(() => {
        res.status(500).send('Error! Cannot get Course!');
      });
  };

  // method - 搜尋課程名稱
  static getCoursesByCourseName = (req, res) => {
    let { name } = req.params;
    console.log('進來findByName了');
    CourseModel.find({ title: name })
      .populate('instructor', ['username', 'email'])
      .then((course) => {
        res.status(200).send(course);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };

  // method - 根據講師ID獲得課程內容
  static getCoursesByInstructorID = (req, res) => {
    let { _instructor_id } = req.params;
    CourseModel.find({ instructor: _instructor_id })
      .populate('instructor', ['username', 'email'])
      .then((data) => {
        res.send(data);
      })
      .catch(() => {
        res.status(500).send('Cannot get course data.');
      });
  };

  // method - 根據學生ID獲得課程內容
  static getCoursesByStudentID = (req, res) => {
    let { _student_id } = req.params;
    CourseModel.find({ students: _student_id })
      .populate('instructor', ['username', 'email'])
      .then((courses) => {
        res.status(200).send(courses); // 因為會找到複數的課程
      })
      .catch(() => {
        res.status(500).send('Cannot get data.');
      });
  };

  // method - 根據課程ID來找到課程內容
  static getCourse = (req, res) => {
    let { _id } = req.params;
    CourseModel.findOne({ _id })
      .populate('instructor', ['email'])
      .then((course) => {
        res.send(course);
      })
      .catch((e) => {
        res.send(e);
      });
  };

  // method - 新增課程
  static createCourse = async (req, res) => {
    // validate the inputs before making a new course
    const { error } = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // 確認input沒問題後就檢查他的身分->必須是老師
    let { title, subtitle, description, price } = req.body;
    if (req.user.isStudent()) {
      return res.status(400).send('Only instructor can post a new course.');
    } // return的話後面都不管

    let newCourse = new CourseModel({
      title,
      subtitle,
      description,
      price,
      instructor: req.user._id,
    });

    try {
      await newCourse.save();
      res.status(200).send('New course has been saved.');
    } catch (err) {
      res.status(400).send('Cannot save course.');
    }
  };

  // method - 編輯課程
  static editCourse = async (req, res) => {
    // validate the inputs before making a new course
    const { error } = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let { _id } = req.params;
    let course = await CourseModel.findOne({ _id });
    if (!course) {
      res.status(404);
      return res.json({
        success: false,
        message: 'Course not found.',
      });
    }

    if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
      CourseModel.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      })
        .then(() => {
          res.send('Course updated.');
        })
        .catch((e) => {
          res.send({
            success: false,
            message: e,
          });
        });
    } else {
      res.status(403);
      return res.json({
        success: false,
        message: 'Only the instructor of this course or web admin can edit this course.',
      });
    }
  };

  // method - 刪除課程
  static deleteCourse = async (req, res) => {
    let { _id } = req.params;
    let course = await CourseModel.findOne({ _id });
    if (!course) {
      res.status(404);
      return res.json({
        success: false,
        message: 'Course not found.',
      });
    }
    // 只有課程講師本人或系統管理者可以刪除課程
    if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
      CourseModel.deleteOne({ _id })
        .then(() => {
          res.send('Course deleted.');
        })
        .catch((e) => {
          res.send({
            success: false,
            message: e,
          });
        });
    } else {
      res.status(403);
      return res.json({
        success: false,
        message: 'Only the instructor of this course or web admin can edit this course.',
      });
    }
  };

  // method - 學生註冊課程
  static enrollCourse = async (req, res) => {
    let { course_id } = req.params;
    let { user_id } = req.body;
    try {
      let course = await CourseModel.findOne({ _id: course_id });
      course.students.push(user_id);
      await course.save();
      res.send('Done Enrollment.');
    } catch (err) {
      res.send(err);
    }
  };
}

export default CourseController;
