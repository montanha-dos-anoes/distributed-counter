import mongoose, { Model, Schema } from 'mongoose';
import { Counter } from '../models/Counter';
import { CounterRepository } from './CounterRepository';

const CounterSchema = new Schema({
  value: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const counterModel = mongoose.model('counter', CounterSchema);

export class MongoDBRepository implements CounterRepository {
  constructor() {}
  async getCounter(): Promise<Counter> {
    const counter = await counterModel.findOne({});
    return new Counter(counter?.value || 0, new Date());
  }

  async increment(): Promise<void> {
    const counter = await counterModel.findOne({});
    if (!counter) {
      await counterModel.create({
        value: 1,
        updatedAt: new Date(),
      });
    } else {
      // console.log('countervalue:', counter.value + 1);

      const result = await counterModel.updateOne(
        { _id: counter._id },
        {
          value: counter.value + 1,
          updatedAt: new Date(),
        },
      );

      if (result.modifiedCount == 0) {
        throw new Error('Not updated');
      }
    }
  }

  async resetCounter(): Promise<void> {
    await counterModel.deleteMany({});
  }
}
