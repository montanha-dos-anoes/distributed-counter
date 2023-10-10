import axios from 'axios';

type Counter = {
  value: number;
  updated_at: string;
}

export default class CounterService {
  private url = 'http://localhost:3333';

  async getCounter(): Promise<Counter> {    
    const response = await axios.get(`${this.url}/counter`);
    return response.data.data;
  }

  async incrementCounter(): Promise<void> {
    const response = await axios.put(`${this.url}/counter`);
    console.log(response.data);
  }
}

