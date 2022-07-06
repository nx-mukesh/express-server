import { Router } from 'express';
import TraineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import { TRAINEES } from '../../libs/constants';
import validation from './validation';

const router = Router();
router.get('/', authMiddleware(TRAINEES, 'read'), validationHandler(validation.get), TraineeController.get);
router.post('/', authMiddleware(TRAINEES, 'write'), validationHandler(validation.create), TraineeController.create);
router.put('/:id', authMiddleware(TRAINEES, 'write'), validationHandler(validation.update), TraineeController.update);

router.delete(
  '/:id',
  authMiddleware(TRAINEES, 'delete'),
  validationHandler(validation.delete),
  TraineeController.delete
);
router.get(
  '/allTrainees',
  authMiddleware(TRAINEES, 'read'),
  validationHandler(validation.get),
  TraineeController.getAll
);
router.post('/login', validationHandler(validation.get), TraineeController.login);

export default router;
