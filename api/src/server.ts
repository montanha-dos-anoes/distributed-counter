import express from 'express';
import cors from 'cors';
import compression from 'compression';
import router from './routes';

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3333;

// app.listen(PORT, () => {
//   console.log(`[server] COMPRESSION > app listen on port: ${PORT}`);
// });

export default app;

