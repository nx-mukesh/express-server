import { Router } from "express";
import { traineeRouter } from "./controller";

const router = Router();

router.use('/trainee', traineeRouter)



export default router;
