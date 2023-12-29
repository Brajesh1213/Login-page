import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/User.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config();
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.error(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.json());
// app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(cookieParser());

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use("/api/user", userRoutes);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
