import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import usersRouter from './routes/users';
import categoriesRouter from './routes/categories';
import productsRouter from './routes/products';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

app.get('*', (_, res) => res.sendStatus(404));

(async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => console.log(`Server running at ${port} port...`));

  process.on('exit', () => {
    mongoose.disconnect();
  });
})().catch(e => console.error(e));