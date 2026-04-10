import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';
import mongoose from 'mongoose';
import config from '../src/config';

let isConnected = false;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // DB connect (only once)
    if (!isConnected) {
      if (!config.database_url) {
        throw new Error('Database URL not found');
      }

      await mongoose.connect(config.database_url, {
        dbName: config.db_name || 'TechEasy',
      });

      isConnected = true;
      console.log('MongoDB connected');
    }

    // Express app handle request
    return app(req, res);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
}