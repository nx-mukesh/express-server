import { Router } from 'express';
import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import { TRAINEES } from '../../libs/constants';
import validation from './validation';

const router = Router();

router.get('/', authMiddleware(TRAINEES, 'read'), validationHandler(validation.get), traineeController.get);
router.post('/', authMiddleware(TRAINEES, 'write'), validationHandler(validation.create), traineeController.create);
router.put('/:id', authMiddleware(TRAINEES, 'write'), validationHandler(validation.update), traineeController.delete);
router.delete('/:id', authMiddleware(TRAINEES, 'delete'), validationHandler(validation.delete), traineeController.delete);
router.get('/getAll', authMiddleware(TRAINEES, 'read'), validationHandler(validation.get), traineeController.getAll);

export default router;
