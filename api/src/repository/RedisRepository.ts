import { RedisClientType } from './../../node_modules/@redis/client/dist/lib/client/index.d';
import { createClient } from 'redis';
import { CounterRepository } from './CounterRepository';
import { Counter } from '../models/Counter';
import { Server } from 'socket.io';

export class RedisRepository implements CounterRepository {
  private redisClient: RedisClientType;
  private COUNTER_KEY = 'counter';

  constructor(private readonly server: Server) {
    this.redisClient = createClient({
      url: process.env.REDIS_URL,
    });
  }

  async connect(): Promise<void> {
    await this.redisClient.connect().then(() => {
      console.log('[database] > redis conected');
    });

    this.redisClient.on('error', (err) => console.log('Redis Client Error', err));

    const teste = await createClient({
      url: process.env.REDIS_URL,
    }).connect();

    teste.configGet('notify-keyspace-events');
    teste.subscribe('__keyevent@0__:incrby', (message, channel) => {
      console.table({message, channel});
      if (message == 'counter') {
        this.server.emit('counter-changed');
        
      }
    });
  }

  async getCounter(): Promise<Counter> {
    const value = await this.redisClient.get(this.COUNTER_KEY);
    return new Counter(Number(value || 0), new Date());
  }

  async increment(): Promise<void> {
    await this.redisClient.incr(this.COUNTER_KEY);
  }

  async resetCounter(): Promise<void> {
    this.redisClient.del(this.COUNTER_KEY);
  }
}
