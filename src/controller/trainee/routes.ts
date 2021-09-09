import { Router } from 'express';
import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import { TRAINEE } from '../../libs/constants';
import validation from './validation';

const router = Router();

router
  .get(
    '/',
    authMiddleware(TRAINEE, 'read'),
    validationHandler(validation.get),
    traineeController.getTrainee
  )
  .post(
    '/',
    authMiddleware(TRAINEE, 'write'),
    validationHandler(validation.create),
    traineeController.addTrainee
  )
  .put(
    '/',
    authMiddleware(TRAINEE, 'write'),
    validationHandler(validation.update),
    traineeController.editTrainee
  )
  .delete(
    '/:id',
    authMiddleware(TRAINEE, 'delete'),
    validationHandler(validation.delete),
    traineeController.deleteTrainee
  )
  .post(
    '/createToken',
    traineeController.createToken
  );

export default router;
