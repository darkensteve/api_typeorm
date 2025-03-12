import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './_middleware/error-handler';
import userRoutes from './users/users.controller';
import './db';  // Adjust this path based on your directory structure

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/users', userRoutes);

// Global error handler
app.use(errorHandler);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
