import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { RedisRepository } from './repository/RedisRepository';
import router from './routes';
import CounterService from './services/CounterService';
import { Server } from 'socket.io';
import { WebSocketsService } from './services/WebSocketsService';

dotenv.config();

const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

async function main() {
  let PORT = process.env.PORT || 3333;

  const portArg = process.argv.find((arg) => arg.includes('port'));
  if (portArg) {
    const portNumber = portArg.split('=').pop();
    PORT = Number(portNumber);
  }
  const processId = process.pid;

  const repository = new RedisRepository(io);
  await repository.connect();
  const counterService = new CounterService(repository);
  app.use(router(counterService));
  
  new WebSocketsService(repository, io);

  server.listen(PORT, () => {
    console.log(`[server] ${processId} > app listen on port: ${PORT}`);
  });
}

if (process.env.SINGLE_MODE) {
  main();
}

export default main;
