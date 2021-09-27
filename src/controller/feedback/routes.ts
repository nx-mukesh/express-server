import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import { HEAD_TRAINER, TRAINEES, REVIEWER } from '../../libs/constants';
import validation from './validation';
import feedbackController from './controller';

const router = Router();

router
  .get('/', authMiddleware(REVIEWER, 'read'), validationHandler(validation.get), feedbackController.getFeedback)
  .post('/', authMiddleware(REVIEWER, 'write'), validationHandler(validation.create), feedbackController.createFeedback)
  .put('/:id', authMiddleware(REVIEWER, 'write'), validationHandler(validation.update), feedbackController.updateFeedback)
  .delete('/:id', authMiddleware(REVIEWER, 'delete'), validationHandler(validation.delete), feedbackController.deleteFeedback)
  // .get('/allTrainees', authMiddleware(TRAINEES, 'read'), validationHandler(validation.get), feedbackController.getAll);

export default router;
