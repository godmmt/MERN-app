import { Router } from 'express';
import { CourseModel } from '../models';
import { courseValidation } from '../validation';
import passport from '../config/passport.config';

const courseRouter = Router();

// middleware
courseRouter.use(passport.authenticate('jwt', { session: false }));

courseRouter.get('/', (req, res) => {
  CourseModel.find({}) // 獲得所有課程的資料
    .populate('instructor', ['username', 'email'])
    .then((course) => {
      res.send(course);
    })
    .catch(() => {
      res.status(500).send('Error! Cannot get Course!');
    });
});

courseRouter.get('/instructor/:_instructor_id', (req, res) => {
  let { _instructor_id } = req.params; // 根據講師ID獲得課程內容
  CourseModel.find({ instructor: _instructor_id })
    .populate('instructor', ['username', 'email'])
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send('Cannot get course data.');
    });
});

courseRouter.get('/findByName/:name', (req, res) => {
  let { name } = req.params;
  console.log('進來findByName了');
  Course.find({ title: name })
    .populate('instructor', ['username', 'email'])
    .then((course) => {
      res.status(200).send(course);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

courseRouter.get('/student/:_student_id', (req, res) => {
  let { _student_id } = req.params;
  Course.find({ students: _student_id })
    .populate('instructor', ['username', 'email']) // 不見得會用到啦就練習
    .then((courses) => {
      res.status(200).send(courses); // 因為會找到複數的課程
    })
    .catch(() => {
      res.status(500).send('Cannot get data.');
    });
});

courseRouter.get('/:_id', (req, res) => {
  let { _id } = req.params;
  Course.findOne({ _id }) // 根據課程ID來找到課程內容
    .populate('instructor', ['email'])
    .then((course) => {
      res.send(course);
    })
    .catch((e) => {
      res.send(e);
    });
});

courseRouter.post('/', async (req, res) => {
  // validate the inputs before making a new course
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認input沒問題後就檢查他的身分->必須是老師
  let { title, description, price } = req.body;
  if (req.user.isStudent()) {
    return res.status(400).send('Only instructor can post a new course.');
  } // return的話後面都不管

  let newCourse = new Course({
    title,
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
});
// 讓學生註冊一個課程
courseRouter.post('/enroll/:_id', async (req, res) => {
  let { _id } = req.params;
  let { user_id } = req.body;
  try {
    let course = await Course.findOne({ _id });
    course.students.push(user_id);
    await course.save();
    res.send('Done Enrollment.');
  } catch (err) {
    res.send(err);
  }
});

courseRouter.patch('/:_id', async (req, res) => {
  // validate the inputs before making a new course
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: 'Course not found.',
    });
  }

  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    Course.findOneAndUpdate({ _id }, req.body, {
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
      message:
        'Only the instructor of this course or web admin can edit this course.',
    });
  }
});

courseRouter.delete('/:_id', async (req, res) => {
  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: 'Course not found.',
    });
  }
  // 只有課程講師本人或系統管理者可以刪除課程
  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    Course.deleteOne({ _id })
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
      message:
        'Only the instructor of this course or web admin can edit this course.',
    });
  }
});

export default courseRouter;
