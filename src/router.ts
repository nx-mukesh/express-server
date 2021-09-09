import { Router } from 'express';
import { traineeRouter, userRouter } from './controller';

const router = Router();

router.use('/trainee', traineeRouter);
router.use('/user', userRouter);

export default router;
