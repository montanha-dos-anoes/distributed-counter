import { RedisClientType } from './../../node_modules/@redis/client/dist/lib/client/index.d';
import { createClient } from 'redis';
import { CounterRepository } from './CounterRepository';
import { Counter } from '../models/Counter';

export class RedisRepository implements CounterRepository {
  private redisClient: RedisClientType;
  constructor() {
    this.redisClient = createClient({
      url: 'redis://127.0.0.1:6379'
    });
    this.redisClient.connect().then(() => {
      console.log('[repository] > redis conected');
    });
  
    this.redisClient.on('error', (err) => console.log('Redis Client Error', err));
  }

  async getCounter(): Promise<Counter> {
    const value = await this.redisClient.get('counter');
    return new Counter(Number(value || 0), new Date());
  }

  async increment(): Promise<void> {
    await this.redisClient.incr('counter');
  }
}
