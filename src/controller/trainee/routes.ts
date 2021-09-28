import { Router } from 'express';
import TraineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import { TRAINEES } from '../../libs/constants';
import validation from './validation';

const router = Router();

// get trainee as per token
/**
 * @swagger
 * /trainee:
 *  get:
 *   description: Returns the users based on token
 *   tags:
 *    - [Trainee]
 *   security:
 *    - bearerAuth: []
 *   responses:
 *     200:
 *      description: Array of trainee
 *      content:
 *        application/json:
 *         schema:
 *           properties:
 *            _id:
 *              type: string
 *            originalId:
 *              type: string
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            role:
 *              type: string
 *            createdAt:
 *              type: string
 *            deletedAt:
 *              type: string
 */
router.get('/', authMiddleware(TRAINEES, 'read'), validationHandler(validation.get), TraineeController.get);

//Create New Trainee
// post swagger
/**
 * @swagger
 * /trainee:
 *   post:
 *     description: Create New trainee
 *     tags: [Trainee]
 *     requestBody:
 *        description: Enter name,email,password,role to create new trainee
 *        required: true
 *        content:
 *           application/json:
 *            schema:
 *             type: object
 *             required:
 *              -email
 *              -password
 *              -role
 *              -name
 *             properties:
 *               name:
 *                type: string
 *                example: 'John Milton'
 *               role:
 *                type: string
 *                example: 'trainee'
 *               email:
 *                type: string
 *                example: 'john@successive.tech'
 *               password:
 *                type: string
 *                example: 'john@123'
 *     responses:
 *         200:
 *           description: Created new trainee successfully
 */
router.post('/', authMiddleware(TRAINEES, 'write'), validationHandler(validation.create), TraineeController.create);

// update existing Trainee
// Update Trainee
/**
 * @swagger
 * /trainee/:id:
 *   put:
 *     description: Update existing trainee
 *     tags: [Trainee]
 *     consumes:
 *         - application/json
 *     produces:
 *         - application/json
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *            type: string
 *           required: true
 *           description: originalId of the trainee
 *           example: 1234frg43455
 *     requestBody:
 *        description: Enter name,email,password,role to update trainee
 *        required: true
 *        content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *                example: 'John hardy'
 *               role:
 *                type: string
 *                example: 'trainee'
 *               email:
 *                type: string
 *                example: 'hardy@successive.tech'
 *               password:
 *                type: string
 *                example: 'hardy@123'
 *     responses:
 *         200:
 *           description: trainee updated successfully
 */
router.put('/:id', authMiddleware(TRAINEES, 'write'), validationHandler(validation.update), TraineeController.update);

//Delete trainee 
/**
 * @swagger
 * /trainee/:id:
 *   delete:
 *     description: Delete trainee
 *     tags: [Trainee]
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *            type: string
 *           required: true
 *           description: id of the trainee
 *           example: 1234frg43455
 *     responses:
 *         200:
 *           description: trainee deleted successfully
 */
 router.delete(
  '/:id',
  authMiddleware(TRAINEES, 'delete'),
  validationHandler(validation.delete),
  TraineeController.delete
);


// Get all trainee
/**
 * @swagger
 * /trainee/allTrainees:
 *  get:
 *   description: Returns all the users
 *   tags:
 *    - [Trainee]
 *   security:
 *    - bearerAuth: []
 *   responses:
 *     200:
 *      description: Array of trainee
 *      content:
 *        application/json:
 *         schema:
 *           properties:
 *            _id:
 *              type: string
 *            originalId:
 *              type: string
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            role:
 *              type: string
 *            createdAt:
 *              type: string
 *            deletedAt:
 *              type: string
 */
 router.get(
  '/allTrainees',
  authMiddleware(TRAINEES, 'read'),
  validationHandler(validation.get),
  TraineeController.getAll
);
router.post('/login', validationHandler(validation.get), TraineeController.login);

export default router;
