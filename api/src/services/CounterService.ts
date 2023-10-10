class Counter {
  constructor(readonly value: number, readonly updated_at: Date) {}
}

class CounterService {
  counter: Counter;

  constructor() {
    this.counter = new Counter(0, new Date());
  }

  getCounter() {
    return this.counter;
  }

  increment() {
    const newCounter = new Counter(this.counter.value + 1, new Date());
    this.counter = newCounter;
  }
}

export default new CounterService();
