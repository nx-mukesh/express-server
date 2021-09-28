import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import { HEAD_TRAINER, TRAINEES, FEEDBACK } from '../../libs/constants';
import validation from './validation';
import feedbackController from './controller';

const router = Router();

// router.get('/', authMiddleware(FEEDBACK, 'read'), validationHandler(validation.get), feedbackController.getFeedback);

router.post(
  '/:id',
  authMiddleware(FEEDBACK, 'write'),
  validationHandler(validation.create),
  feedbackController.createFeedback
);

// router.put(
//   '/:id',
//   authMiddleware(FEEDBACK, 'write'),
//   // validationHandler(validation.update),
//   feedbackController.updateFeedback
// );

// router.delete(
//   '/:id',
//   authMiddleware(FEEDBACK, 'delete'),
//   // validationHandler(validation.delete),
//   feedbackController.deleteFeedback
// );

export default router;
