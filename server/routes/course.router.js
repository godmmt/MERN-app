import { Router } from 'express';
import passport from '../config/passport.config.js';
import { CourseController, ImgurController } from '../controller/index.js';
import { AuthValidator, CourseValidator } from '../validations/index.js';

const courseRouter = Router();

courseRouter.get('/', CourseController.getCourses); // 訪客可使用
courseRouter.get('/findByName/:name?', CourseController.getCoursesByCourseName); // 訪客可使用

courseRouter.use(passport.authenticate('jwt', { session: false }));

// fetch Course
courseRouter.get('/instructor/:_instructor_id', AuthValidator.hasInstructorPermission, CourseController.getCoursesByInstructorID);
courseRouter.get('/student/:_student_id', AuthValidator.hasStudentPermission, CourseController.getCoursesByStudentID);

// Course CRUD
courseRouter.get('/:_id', CourseController.getCourse);
courseRouter.post(
  '/',
  AuthValidator.hasInstructorPermission,
  ImgurController.parseImage,
  CourseValidator.hasValidCourseInfo,
  ImgurController.uploadImage,
  CourseController.createCourse
);
courseRouter.patch(
  '/:_id',
  AuthValidator.hasInstructorPermission,
  ImgurController.parseImage,
  CourseValidator.hasValidCourseInfo,
  ImgurController.uploadImage,
  CourseController.editCourse
);
courseRouter.delete('/:_id', AuthValidator.hasInstructorPermission, CourseController.deleteCourse);

// Enroll Course
courseRouter.post('/enroll/:course_id', AuthValidator.hasStudentPermission, CourseController.enrollCourse);

export default courseRouter;
