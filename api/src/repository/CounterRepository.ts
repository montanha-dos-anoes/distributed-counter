import { Counter } from "../models/Counter";

export interface CounterRepository {
  getCounter(): Promise<Counter>;
  increment(): Promise<void>;
}