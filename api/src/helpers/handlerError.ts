import { Response } from 'express';

export const handleError = (error: Error, res: Response) =>
  res.status(400).send({
    data: null,
    message: 'Deu ruim!',
    error: (error as Error).toString(),
  });
