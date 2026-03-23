import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import gameRoutes from './routes/gameRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', gameRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({ 
    success: false, 
    error: err.message,
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Build or Burn API is running' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB if MONGO_URI is provided, otherwise run without DB (in-memory fallback for now)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('No MONGO_URI found in .env, running without database connection initially.');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
