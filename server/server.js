import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

//Express app
const app = express();

//Middle wares
app.use(cors());
app.use(express.json());

//MongoDB connection
try{
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

//Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Event Management API');
});

//Auth routes
app.use('/api/auth', authRoutes);
//Event routes
app.use('/api/events', eventRoutes);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
