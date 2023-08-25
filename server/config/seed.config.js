import 'dotenv/config';
import { UserModel, CourseModel } from '../models/index.js';
import connectToDB from './db.config.js';
import { courses, users } from '../data/index.js';
import AuthController from '../controller/auth.controller.js';

async function seedData() {
  connectToDB();
  try {
    await UserModel.deleteMany();
    await CourseModel.deleteMany();

    // users data
    const hashPasswordUsers = users.map(async (user) => ({ ...user, password: await AuthController.hashPassword(user.password) }));
    const insertUsers = await Promise.all(hashPasswordUsers);
    await UserModel.insertMany(insertUsers);

    // courses data
    const changeStudentsEmailToID = courses.map(async (course) => {
      const instructorID = await UserModel.findOne({ email: course.instructor }, { select: '_id' });
      const students = await UserModel.find({ email: { $in: course.students } });
      const studentsID = students.map((student) => student._id);
      return {
        ...course,
        instructor: instructorID,
        students: studentsID,
      };
    });
    const insertCourses = await Promise.all(changeStudentsEmailToID);
    await CourseModel.insertMany(insertCourses);

    console.log('Seeded data successfully.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedData();
