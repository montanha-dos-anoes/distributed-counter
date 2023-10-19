import { PrismaClient } from '@prisma/client';
import { Counter } from '../models/Counter';
import { CounterRepository } from './CounterRepository';

export class PostgresCounterRepository implements CounterRepository {
  prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient({ log: ['error', 'info'] });
  }

  async getCounter(): Promise<Counter> {
    const counter = await this.prismaClient.counter.findFirst();
    return new Counter(counter?.value || 0, counter?.updatedAt || new Date());
  }

  async increment(): Promise<void> {
    const counter = await this.prismaClient.counter.findFirst();
    if (!counter) {
      await this.prismaClient.counter.create({
        data: {
          value: 1,
        },
      });
    } else {
      // const newValue = counter.value + 1;
            
      // await this.prismaClient.counter.update({
      //   where: { id: counter.id },
      //   data: {
      //     value: newValue,
      //     updatedAt: new Date()
      //   },       
      // });

      // Update lidando com concorrencia
      await this.prismaClient.$executeRaw`UPDATE "Counter" SET value = value + 1 WHERE id = ${counter.id}`;

    }
  }

  async resetCounter(): Promise<void> {
    await this.prismaClient.counter.deleteMany({});
  }
}
