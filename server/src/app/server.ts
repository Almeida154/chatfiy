import 'reflect-metadata';
import express from 'express';

import { routes } from './routes';
import AppDataSource from './data-source';

const app = express();

AppDataSource.initialize().then(() =>
  console.log('📦 Database connected successfully')
);

const PORT = 3333;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`✅ Server is listening on port ${PORT}`));
