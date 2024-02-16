import express, { json, urlencoded } from 'express';
import path, { join } from 'path';
import cors from 'cors';
import { mongoose } from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import adminRoute from './routes/adminRoute.js';
import usersRouter from './routes/userRoute.js';

var app = express();

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));
console.log(process.env.MONGO_CONNECTION_URL, '"""""')

mongoose.connect(process.env.MONGO_CONNECTION_URL).then((res) => {
  console.log('mongoose connected successfully...')
}).catch((err) => {
  console.log('mongoose failed to connect..', err)
})


app.get('/', (req, res) => res.send('Hello'))

app.use('/admin', adminRoute);
app.use('/', usersRouter);

app.listen(process.env.PORT, () => {
  console.log('server is running on ' + process.env.PORT)
})


export default app;
