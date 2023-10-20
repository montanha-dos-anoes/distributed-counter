import { Counter } from "../models/Counter";

export interface CounterRepository {
  connect(): Promise<void>;
  getCounter(): Promise<Counter>;
  increment(): Promise<void>;
  resetCounter(): Promise<void>;
}