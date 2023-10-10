import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`[server] > app listen on port: ${PORT}`);
});
