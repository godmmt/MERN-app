import { CourseModel } from '../models/index.js';

class CourseController {
  // 搜尋所有課程
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

  // 以課程名稱搜尋課程
  static getCoursesByCourseName = (req, res) => {
    const { name } = req.params;
    console.log('進來findByName了', name);
    CourseModel.find({ title: name })
      .populate('instructor', ['username', 'email'])
      .then((course) => {
        res.status(200).send(course);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };

  // 根據講師ID獲得課程內容
  static getCoursesByInstructorID = (req, res) => {
    const { _instructor_id } = req.params;
    CourseModel.find({ instructor: _instructor_id })
      .populate('instructor', ['username', 'email'])
      .then((data) => {
        res.send(data);
      })
      .catch(() => {
        res.status(500).send('Cannot get course data.');
      });
  };

  // 根據學生ID獲得課程內容
  static getCoursesByStudentID = (req, res) => {
    const { _student_id } = req.params;
    CourseModel.find({ students: _student_id })
      .populate('instructor', ['username', 'email'])
      .then((courses) => {
        res.status(200).send(courses); // 因為會找到複數的課程
      })
      .catch(() => {
        res.status(500).send('Cannot get data.');
      });
  };

  // 根據課程ID來找到課程內容
  static getCourse = (req, res) => {
    const { _id } = req.params;
    CourseModel.findOne({ _id })
      .populate('instructor', ['email'])
      .then((course) => {
        res.send(course);
      })
      .catch((e) => {
        res.send(e);
      });
  };

  // 新增課程
  static createCourse = async (req, res) => {
    const { title, subtitle, description, price } = req.body;
    // 儲存課程到DB
    try {
      const newCourse = new CourseModel({
        title,
        subtitle,
        description,
        price,
        instructor: req.user._id,
        img: req.imgURL,
      });
      await newCourse.save();
      res.status(200).send('New course has been saved.');
    } catch (err) {
      res.status(400).send('Cannot save course.');
    }
  };

  // 編輯課程
  static editCourse = async (req, res) => {
    const { _id } = req.params;

    // 檢查是否有該課程存在
    const course = await CourseModel.findOne({ _id });
    if (!course) {
      res.status(404);
      return res.json({
        success: false,
        message: 'Course not found.',
      });
    }

    const newCourseInfo = { ...req.body, img: req.imgURL };

    // 檢查身分是否為該開課講師
    if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
      CourseModel.findOneAndUpdate({ _id }, newCourseInfo, {
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

  // 刪除課程
  static deleteCourse = async (req, res) => {
    const { _id } = req.params;

    // 檢查是否有該課程存在
    const course = await CourseModel.findOne({ _id });
    if (!course) {
      res.status(404);
      return res.json({
        success: false,
        message: 'Course not found.',
      });
    }

    // 檢查身分是否為該開課講師
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

  // 學生註冊課程
  static enrollCourse = async (req, res) => {
    const { course_id } = req.params;
    const { user_id } = req.body;
    try {
      const course = await CourseModel.findOne({ _id: course_id });
      course.students.push(user_id);
      await course.save();
      res.send('Done Enrollment.');
    } catch (err) {
      res.send(err);
    }
  };
}

export default CourseController;
