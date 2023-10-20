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

  async connect(): Promise<void> {
    mongoose
      .connect(process.env.MONGODB_URL || '')
      .then(() => {
        console.log(`[database] > mongodb database conected`);
      })
      .catch((err) => console.log('mongoerror: ', err));
  }

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

      await counterModel.findOneAndUpdate(
        { _id: counter._id },
        {
          $inc: { value: 1 },
        },
      );
    }
  }

  async resetCounter(): Promise<void> {
    await counterModel.deleteMany({});
  }
}
