import { Counter } from '../models/Counter';
import { CounterRepository } from './CounterRepository';

class InMemoryRepository implements CounterRepository {
  counter: Counter;

  constructor() {
    this.counter = new Counter(0, new Date());
  }
  
  async connect(): Promise<void> {
    console.log('[database] > in memory repository');
  }
  
  
  async getCounter(): Promise<Counter> {
    return this.counter;
  }

  async increment(): Promise<void> {
    const newCounter = new Counter(this.counter.value + 1, new Date());
    this.counter = newCounter;
  }

  async resetCounter(): Promise<void> {
    this.counter = new Counter(0, new Date());
  }
}

export default new InMemoryRepository();
