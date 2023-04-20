const PORT = 8000

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

app.get('/env-vars', (req, res) => {
    const envVars = {
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      APP_ID: process.env.APP_ID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID
    };
  
    res.json(envVars);
  });

app.listen(PORT, () => console.log('Server started on port ' + PORT))