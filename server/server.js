import { v2 } from 'cloudinary';
import Razorpay from 'razorpay';
import mongoose from 'mongoose'; 
import app from './app.js';

import dotenv from 'dotenv';
dotenv.config({ path: 'd:/pw web/lms/server/.env' }); // Specify the full path to the .env file

import connectToDB from './configs/dbConn.js';

// Cloudinary configuration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(process.env.MONGODB_URI);
// const connectToDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected successfully!");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// };

// Razorpay configuration
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const PORT = process.env.PORT || 5002;


app.listen(PORT, async () => {
  // Connect to DB
  await connectToDB();
  console.log(`App is running at http://localhost:${PORT}`);

});
