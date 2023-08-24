import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  students: {
    type: [String], // an array of String
    default: [],
  },
  img: {
    type: String,
  },
});

const CourseModel = mongoose.model('Course', courseSchema);

export default CourseModel;
