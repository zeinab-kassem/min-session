import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ATLAS_URL = process.env.ATLAS_URL;

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB is connected ..');
  } catch (err) {
    console.error("ee ",err.message);
    process.exit(1);
  }
};

export default db;