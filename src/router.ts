import { Router } from 'express';
import { traineeRouter, userRouter, feedbackRouter } from './controller';

export const router: Router = Router();
/**
 * @swagger
 * securityDefinitions:
 *   APIKeyHeader:
 *     type: apiKey
 *     in:header
 *     name:Authorization
 */
router.use('/trainee', traineeRouter);
router.use('/user', userRouter);
// review
router.use('/feedback', feedbackRouter);

export default router;
