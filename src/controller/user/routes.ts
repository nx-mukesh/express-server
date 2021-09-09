import { Router } from 'express';
import User from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';

const router = Router();

router
  .get('/', validationHandler(validation.get), User.get)
  .post('/', validationHandler(validation.create), User.post)
  .put('/', validationHandler(validation.update), User.edit)
  .delete('/:id', validationHandler(validation.delete), User.delete);

export default router;
