import { Router } from 'express';
import { handleError } from '../helpers/handlerError';
import CounterService from '../services/CounterService';

const router = Router();

export default (counterService: CounterService) => {
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

  router.delete('/counter', async (req, res, next) => {
    try {
      await counterService.resetCounter();

      return res.status(200).send({
        data: null,
        message: 'Deu bom!',
      });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  return router;
};

// export default router;
