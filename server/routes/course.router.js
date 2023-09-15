import { Router } from 'express';
import { CourseController } from '../controller/index.js';
import passport from '../config/passport.config.js';

const courseRouter = Router();

courseRouter.get('/', CourseController.getCourses); // 訪客可使用
courseRouter.get('/findByName/:name?', CourseController.getCoursesByCourseName); // 訪客可使用

courseRouter.use(passport.authenticate('jwt', { session: false }));

// fetch Course
courseRouter.get('/instructor/:_instructor_id', CourseController.getCoursesByInstructorID);
courseRouter.get('/student/:_student_id', CourseController.getCoursesByStudentID);

// Course CRUD
courseRouter.post('/', CourseController.createCourse);
courseRouter.get('/:_id', CourseController.getCourse);
courseRouter.patch('/:_id', CourseController.editCourse);
courseRouter.delete('/:_id', CourseController.deleteCourse);

// Enroll Course
courseRouter.post('/enroll/:course_id', CourseController.enrollCourse);

export default courseRouter;
