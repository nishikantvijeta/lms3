import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();

// ✅ Middlewares
 

// ✅ CORS Setup
app.use(
  cors({
    origin: "*", // ✅ Allow only your frontend
    credentials: true, // ✅ Required for cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Add allowed methods
    allowedHeaders: ["Content-Type", "Authorization" ,"Set-Cookie"] // ✅ Add necessary headers
  })
);

app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
const SECRET_KEY = process.env.JWT_SECRET; // Replace with your actual secret key




//app.use(cookieParser());
app.get('/set-cookie', (req, res) => {
    if (!SECRET_KEY) {
        return res.status(500).json({ error: "JWT_SECRET is not defined in environment variables" });
    }

    const token = jwt.sign({ id: user._id, role: user.role}, SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });


    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
        sameSite: "None",
     path: "/"
    });

    res.json({ message: "JWT Cookie set!", token });
});


app.get('/check-cookie', (req, res) => {
    const token = req.cookies.token; // Accessing the cookie

    if (!token) {
        return res.status(401).json({ success: false, message: "No cookie found!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Invalid token!" });
        }
        res.json({ success: true, message: "Cookie is valid!", user: decoded });
    });
});
// ✅ Server Status Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

app.head("/", (req, res) => {
  res.status(200).end();
});
// ✅ Import Routes
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/misc', miscRoutes);

// ✅ Default 404 Route
app.all('*', (_req, res) => {
  res.status(404).json({ error: 'OOPS!!! 404 Page Not Found' });
});

// ✅ Custom Error Middleware
app.use(errorMiddleware);

export default app;
