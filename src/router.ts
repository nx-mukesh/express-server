import { Router } from 'express';
import { traineeRouter, userRouter } from './controller';

export const router: Router = Router();
/**
 *
 * @swagger
 * securityDefinitions:
 *   APIKeyHeader:
 *     type: apiKey
 *     in:header
 *     name:Authorization
 */
router.use('/trainee', traineeRouter);
router.use('/user', userRouter);

export default router;
