import { Router } from 'express';
import UserController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import validation from './validation';
import { TRAINER, USER } from '../../libs/constants';

const router = Router();

router.get('/', authMiddleware(USER, 'read'), validationHandler(validation.get), UserController.get);
router.post('/', authMiddleware(USER, 'write'), validationHandler(validation.create), UserController.create);
router.put('/:id', authMiddleware(USER, 'write'), validationHandler(validation.update), UserController.update);
router.delete('/:id', authMiddleware(USER, 'delete'), validationHandler(validation.delete), UserController.delete);
router.get('/all', authMiddleware(USER, 'read'), validationHandler(validation.get), UserController.getAll);
router.post('/login', validationHandler(validation.create), UserController.login);
router.post('/createToken', UserController.createToken);
export default router;
