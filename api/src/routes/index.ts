import { Router } from 'express';
import { handleError } from '../helpers/handlerError';
import { MongoDBRepository } from '../repository/MongoDBCounterRepository';
import CounterService from '../services/CounterService';
import { RedisRepository } from '../repository/RedisRepository';

const router = Router();
const counterService = new CounterService(new RedisRepository());

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
