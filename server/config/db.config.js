import mongoose from 'mongoose';

async function connectToDB() {
  const db = process.env.DB_CONNECT;
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect to DB successfully!');
  } catch (error) {
    console.log('Something went wrong with Database connection');
    console.log(error);
  }
}

export default connectToDB;
