import { Server, Socket } from 'socket.io';
import { CounterRepository } from '../repository/CounterRepository';

export class WebSocketsService {
  constructor(private readonly repository: CounterRepository, private readonly server: Server) {
    this.handleEmmiters();
  }

  private handleEmmiters() {
    this.server.on('connection', (socket: Socket) => {
      console.log('[websocket] > a user connected');

      socket.on('increment', () => {
        this.repository.increment();        
      });

      socket.on('disconnect', () => {
        console.log('[websocket] > a user disconnected');
      });
    });
  }
}
