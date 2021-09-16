import { Router } from 'express';
import User from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import validation from './validation';
import { USER } from '../../libs/constants';

const router = Router();

router
  .get(
    '/',
    authMiddleware(USER, 'read'),
    validationHandler(validation.get),
    User.get
  )
  .post('/', validationHandler(validation.create), User.post)
  .put('/', validationHandler(validation.update), User.edit)
  .delete('/:id', validationHandler(validation.delete), User.delete)
  .post('/createToken', User.createToken);

export default router;
