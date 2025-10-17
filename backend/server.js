import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// NEW: contact route
import contactRouter from './routes/contactRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

// Health check (optional but useful for uptime checks)
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Existing mounts (unchanged)
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// NEW: contact form endpoint (for Nodemailer)
app.use('/api/contact', contactRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; // optional export if deploying to serverless
