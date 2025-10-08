const mongoose = require('mongoose');

const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

