import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongoose connected');
  } catch (error) {
    console.error('mongoose notttt connected', error);
    process.exit(1); //exiting with failure
  }
};
