import fs from 'fs';

const rawUsers = fs.readFileSync('data/users.json');
const rawCourses = fs.readFileSync('data/courses.json');

export const users = JSON.parse(rawUsers);
export const courses = JSON.parse(rawCourses);
