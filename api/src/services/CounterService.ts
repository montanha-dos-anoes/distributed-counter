import { CounterRepository } from '../repository/CounterRepository';

class CounterService {
  constructor(private readonly repository: CounterRepository) {}

  async getCounter() {
    return await this.repository.getCounter();
  }

  async increment() {
    await this.repository.increment();
  }
}

export default CounterService;
