import cookieParser from 'cookie-parser';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();
dotenv.config();
// Middlewares
// Built-In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third-Party
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL||'http://127.0.0.1:3000',],
//     credentials: true,
//     allowedHeaders:"*",
//    // Access-Control-Allow-Origin: "*"
//    AccessControlAllowOrigin:"*",
    
//   })
// );
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || 'http://127.0.0.1:3000'||'http://localhost:3000',
//    credentials: true,
//    AccessControlAllowOrigin:"*",
//   // allowedHeaders:"*", // Define headers specifically
//    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
// //     res.setHeader("Access-Control-Allow-Origin", "*"),
// // res.setHeader("Access-Control-Allow-Credentials", "true"),
// // res.setHeader("Access-Control-Max-Age", "1800"),
// // res.setHeader("Access-Control-Allow-Headers", "content-type")
//   })
// );
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://127.0.0.1:3000',
      'http://localhost:3000', 
      'http://192.168.133.223:3000'  // Add your device's IP if needed
    ],
    credentials: true,  // Allow cookies, sessions, and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],  // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allowed headers
  })
);

app.use(morgan('dev'));
app.use(cookieParser());

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import all routes
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.post('/api/v1', miscRoutes);

// Default catch all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;
