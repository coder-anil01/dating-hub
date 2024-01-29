import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import girlRoute from './routes/girlRoute.js'
import conectToDatabase from './db.js';
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
conectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 8000

app.use('/api/v1/girl', girlRoute)

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