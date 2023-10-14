import { CounterRepository } from '../repository/CounterRepository';

class CounterService {
  constructor(private readonly repository: CounterRepository) {}

  async getCounter() {
    return this.repository.getCounter();
  }

  async increment() {
    this.repository.increment();
  }
}

export default CounterService;
