import { Router } from 'express';
import traineeController from './Controller';

const router = Router();

router
  .get('/', traineeController.getTrainee)
  .post('/', traineeController.addTrainee)
  .put('/', traineeController.editTrainee)
  .delete('/:id', traineeController.deleteTrainee);

export default router;
