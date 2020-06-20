import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());

// This makes express understand JSON in body
app.use(express.json());

app.use(routes);

app.use('/updloads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Listen port 333
app.listen(3333);