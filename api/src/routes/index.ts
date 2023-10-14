import { Router } from 'express';
import { handleError } from '../helpers/handlerError';
import inMemoryRepository from '../repository/InMemoryRepository';
import CounterService from '../services/CounterService';
import { PostgresCounterRepository } from '../repository/PostgresCounterRepository';

const router = Router();
const counterService = new CounterService(inMemoryRepository);

router.get('/counter', async (req, res, next) => {
  try {
    const result = await counterService.getCounter();

    return res.status(200).send({
      data: result,
      message: 'Deu bom!',
    });
  } catch (error) {
    return handleError(error as Error, res);
  }
});

router.put('/counter', async (req, res, next) => {
  try {
    await counterService.increment();

    return res.status(200).send({
      data: null,
      message: 'Deu bom!',
    });
  } catch (error) {
    return handleError(error as Error, res);
  }
});

export default router;
