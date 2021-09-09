import { Router } from 'express';
import User from './Controller';
const router = Router();

router
  .get('/', User.get)
  .post('/', User.post)
  .put('/', User.edit)
  .delete('/:id', User.delete);

export default router;
