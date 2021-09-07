import { Router } from 'express';
import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';

const router = Router();

router
  .get('/', validationHandler(validation.get), traineeController.getTrainee)
  .post('/', validationHandler(validation.create), traineeController.addTrainee)
  .put('/', validationHandler(validation.update), traineeController.editTrainee)
  .delete(
    '/:id',
    validationHandler(validation.delete),
    traineeController.deleteTrainee
  );

export default router;
