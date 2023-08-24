import 'dotenv/config';
import bcrypt from 'bcrypt';
import { UserModel, CourseModel } from '../models/index.js';
import connectToDB from './db.config.js';
import { courses, users } from '../data/index.js';

async function seedData() {
  connectToDB();
  try {
    await UserModel.deleteMany();
    await CourseModel.deleteMany();

    const insertUsers = await Promise.all(users.map(async (user) => ({ ...user, password: await bcrypt.hash(user.password, 10) })));
    await UserModel.insertMany(insertUsers);

    const insertCourses = await Promise.all(
      courses.map(async (course) => {
        const instructor = await UserModel.findOne({ email: course.instructor }, { select: '_id' });
        const students = await UserModel.find({ email: { $in: course.students } });
        const studentsID = students.map((student) => student._id);
        return {
          ...course,
          instructor,
          students: studentsID,
        };
      })
    );
    console.log('insertCourses', insertCourses);
    await CourseModel.insertMany(insertCourses);

    console.log('Seeded data successfully.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedData();
