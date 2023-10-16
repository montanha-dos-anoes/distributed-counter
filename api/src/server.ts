import express from 'express';
import cors from 'cors';
import compression from 'compression';
import router from './routes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

app.use(router);

function main() {
  const PORT = process.env.PORT || 3333;
  const processId = process.pid;

  app.listen(PORT, () => {
    console.log(`[server] ${processId} > app listen on port: ${PORT}`);
  });

  mongoose
    .connect(process.env.MONGODB_URL || '')
    .then(() => {
      console.log(`[server] > mongodb database conected`);
    })
    .catch((err) => console.log('mongoerror: ', err));
}

if (process.env.SINGLE_MODE) {
  main();
}

export default main;
