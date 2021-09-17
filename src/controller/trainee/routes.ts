import { Router } from 'express';
import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import { TRAINEES } from '../../libs/constants';
import validation from './validation';

const router = Router();

router.get(
  '/',
  authMiddleware(TRAINEES, 'read'),
  validationHandler(validation.get),
  traineeController.getTrainee
);

router.post(
  '/',
  authMiddleware(TRAINEES, 'write'),
  validationHandler(validation.create),
  traineeController.addTrainee
);

router.put(
  '/',
  authMiddleware(TRAINEES, 'write'),
  validationHandler(validation.update),
  traineeController.editTrainee
);

router.delete(
  '/:id',
  authMiddleware(TRAINEES, 'delete'),
  validationHandler(validation.delete),
  traineeController.deleteTrainee
);

export default router;
