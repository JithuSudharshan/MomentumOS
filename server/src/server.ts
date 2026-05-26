import expressModule from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import aiRoutes from './routes/aiRoutes';
import dataRoutes from './routes/dataRoutes';

dotenv.config();

const app = expressModule();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
  mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(err => console.log('MongoDB Connection Error:', err));
} else {
  console.log('MONGO_URI is missing in .env');
}

app.use(cors());
app.use(expressModule.json());

// Routes
app.use('/api', aiRoutes);
app.use('/api/data', dataRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'MomentumOS Backend is alive' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
