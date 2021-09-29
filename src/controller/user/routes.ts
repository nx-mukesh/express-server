import { Router } from 'express';
import UserController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import validation from './validation';
import { USER } from '../../libs/constants';

const router = Router();

/**
 * @swagger
 * definitions:
 *  UserSchema:
 *    properties:
 *      _id:
 *        type: string
 *      id:
 *        type: string
 *      originalId:
 *        type: string
 *      name:
 *        type: string
 *      email:
 *        type: string
 *      password:
 *        type: string
 *      createdAt:
 *        type: string
 *      deletedAt:
 *        type: string
 *  Users:
 *    type: array
 *    items:
 *        $ref: '#/definitions/UserSchema'
 *  User:
 *    type: object
 *    $ref: '#/definitions/UserSchema'
 *  UserListResponse:
 *    properties:
 *      message:
 *        type: string
 *        example: Success
 *      status:
 *        type: integer
 *        example: Success
 *      data:
 *        $ref: '$/definition/Users'
 *  UserByIdGetResponse:
 *    properties:
 *      message:
 *        type: string
 *        example: Success
 *      status:
 *        type: integer
 *        example: 200
 *      data: '#/definitions/User'
 */

// get user as per token
/**
 * @swagger
 * /user:
 *  get:
 *   security:
 *    - JWT: []
 *   tags:
 *    - User
 *   description: Returns the users based on token
 *   produces:
 *    - application/json
 *   responses:
 *     200:
 *      description: Array of user
 *      schema:
 *        $ref: '#/definitions/UserListResponse'
 */
router.get('/', authMiddleware(USER, 'read'), validationHandler(validation.get), UserController.get);

// post user
/**
 * @swagger
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
 *           description: Created new user successfully
 */
router.post('/', authMiddleware(USER, 'write'), validationHandler(validation.create), UserController.create);

// Update user
/**
 * @swagger
 * /user/:id:
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
 *           description: User updated successfully
 */
router.put('/:id', authMiddleware(USER, 'write'), validationHandler(validation.update), UserController.update);

// delete user-
/**
 * @swagger
 * /user/:id:
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
router.delete('/:id', authMiddleware(USER, 'delete'), validationHandler(validation.delete), UserController.delete);

// Get all User
/**
 * @swagger
 * /user/users:
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
router.get('/all', authMiddleware(USER, 'read'), validationHandler(validation.get), UserController.getAll);

// user login
/**
 * @swagger
 * /user/login:
 *   post:
 *     description: Login
 *     tags: [User]
 *     requestBody:
 *        description: Enter Email and Password
 *        required: true
 *        content:
 *           application/json:
 *            schema:
 *             type: object
 *             required:
 *              -email
 *              -password
 *             properties:
 *               email:
 *                type: string
 *                example: 'john@successive.tech'
 *               password:
 *                type: string
 *                example: 'john@123'
 *     responses:
 *         201:
 *           description: Login Successful
 */
router.post('/login', validationHandler(validation.login), UserController.login);

// create Token
/**
 * @swagger
 * /user/createToken:
 *   post:
 *     description: create token
 *     tags: [User]
 *     requestBody:
 *        description: Enter ID and Email
 *        required: true
 *        content:
 *           application/json:
 *            schema:
 *             type: object
 *             required:
 *              -Id
 *              -Email
 *             properties:
 *               Id:
 *                type: string
 *                example: _id:"614b21527b24882e7a49cf0a"
 *               email:
 *                type: string
 *                example: "milinda@successive.tech"
 *     responses:
 *         200:
 *           description: Token created
 */
router.post('/createToken', UserController.createToken);

export default router;
