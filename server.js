import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import girlRoute from './routes/girlRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import conectToDatabase from './db.js';
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
conectToDatabase();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 8000

app.use('/api/v1/girl', girlRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/order', orderRoute)

// esmodulsefix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
  

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })