import { Router } from 'express';
import UserController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import validation from './validation';
import { USER } from '../../libs/constants';

const router = Router();


router.get('/profile', authMiddleware(USER, 'read'), validationHandler(validation.get), UserController.get);
/**
 * @openapi
 * /user:
 *  get:
 *   security:
 *    - bearerAuth: []
 *   tags:
 *    - User
 *   description: Returns all the users
 *   responses:
 *     200:
 *      description: Array of user
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
router.post('/', authMiddleware(USER, 'write'), validationHandler(validation.create), UserController.create);
/**
 * @openapi
 * /user:
 *   post:
 *     description: Create New User
 *     tags: [User]
 *     requestBody:
 *        description: Enter name,email,password,role to create new user
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
 *                example: 'Mayur Mahajan'
 *               role:
 *                type: string
 *                example: 'trainee'
 *               email:
 *                type: string
 *                example: 'mayur.mahajan@successive.tech'
 *               password:
 *                type: string
 *                example: 'Mayur@123'
 *     responses:
 *         201:
 *           description: Created new user successfully
 */

router.put('/:id', authMiddleware(USER, 'write'), validationHandler(validation.update), UserController.update);
/**
 * @openapi
 * /user/{id}:
 *   put:
 *     description: Update existing User
 *     tags: [User]
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
 *           description: originalId of the user
 *           example: 1234frg43455
 *     requestBody:
 *        description: Enter name,email,password,role to update user
 *        required: true
 *        content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *                example: 'M Mahajan'
 *               role:
 *                type: string
 *                example: 'trainee'
 *               email:
 *                type: string
 *                example: 'm.mahajan@successive.tech'
 *               password:
 *                type: string
 *                example: 'M@123'
 *     responses:
 *         200:
 *           description: User updated successfully
 */
router.delete('/:id', authMiddleware(USER, 'delete'), validationHandler(validation.delete), UserController.delete);
/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     description: Delete User
 *     tags: [User]
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *            type: string
 *           required: true
 *           description: id of the user
 *           example: 1234frg43455
 *     responses:
 *         200:
 *           description: user deleted successfully
 */

router.get('/', authMiddleware(USER, 'read'), validationHandler(validation.getAll), UserController.getAll);
router.post('/login', validationHandler(validation.login), UserController.login);
export default router;
