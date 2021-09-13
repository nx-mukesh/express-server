import { Router } from 'express';
import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import { TRAINEES } from '../../libs/constants';
import validation from './validation';

const router = Router();

router
  .get(
    '/',
    authMiddleware(TRAINEES, 'read'),
    validationHandler(validation.get),
    traineeController.getTrainee
  )
  .post(
    '/',
    authMiddleware(TRAINEES, 'write'),
    validationHandler(validation.create),
    traineeController.addTrainee
  )
  .put(
    '/',
    authMiddleware(TRAINEES, 'write'),
    validationHandler(validation.update),
    traineeController.editTrainee
  )
  .delete(
    '/:id',
    authMiddleware(TRAINEES, 'delete'),
    validationHandler(validation.delete),
    traineeController.deleteTrainee
  )
  .post(
    '/createToken',
    traineeController.createToken
  );

export default router;
