import { Router } from 'express';
import { handleError } from '../helpers/handlerError';
import counterService from '../services/CounterService';

const router = Router();

router.get('/counter', (req, res, next) => {
  try {
    const result = counterService.getCounter();

    return res.status(200).send({
      data: result,
      message: 'Deu bom!',
    });
  } catch (error) {
    return handleError(error as Error, res);
  }
});

router.put('/counter', (req, res, next) => {
  try {    
    counterService.increment();

    return res.status(200).send({
      data: null,
      message: 'Deu bom!',
    });
  } catch (error) {
    return handleError(error as Error, res);
  }
});

export default router;
