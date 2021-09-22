import { Router } from 'express';
import UserController from './Controller';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from '../../libs/routes/authMiddleWare';
import validation from './validation';
import { HEAD_TRAINER, USER } from '../../libs/constants';

export const router = Router();

/**
 * @Swagger
 * definitions:
 *  UserSchema:
 *   properties:
 *    _id:
 *     type:string
 *    id:
 *     type:string
 *    name:
 *     type:string
 *    email:
 *     type:string
 *    password:
 *     type:string
 *    role:
 *     type:string
 *    createdAt:
 *     type:string
 *    deletedAt:
 *     type:string
 *  users:
 *   type:array
 *    $items:
 *     ref:'#/definitions/UserSchema'
 *  User:
 *   type:object
 *    items:
 *     $ref:'#/definitions/UserSchema'
 *  UserListResponse:
 *   properties:
 *    message:
 *     type:string
 *     example:Success
 *    status:
 *     type:integer
 *     example:200
 *    data:
 *     $ref:'#/definitions/Users'
 *  UserByIdGetResponse:
 *   properties:
 *    message:
 *     type: string
 *     example: Success
 *    status:
 *     type: integer
 *     example: 200
 *    data:
 *     $ref:'#/definitions/User'
 */

/**
 * @swagger
 * /user:
 *  get:
 *   security:
 *    -APIKeyHeader:[]
 *   tags:
 *    -User
 *   description: Return all the users
 *   produces;
 *    -application/json
 *   responses:
 *    200:
 *     description: Array of user
 *     schema:
 *      $ref: '#/definitions/UserListResponse'
 */
router.get('/', authMiddleware(USER, 'read'), validationHandler(validation.get), UserController.get);

router.get('/all', authMiddleware(USER, 'read'), validationHandler(validation.get), UserController.getAll);
 
/**
 * @swagger
 * /user
 *  post:
 *    security:
 *      -APIKeyHeader:[]
 *    tags:
 *      - User
 *    description: Returns all the user
 *      parameters:
 *        -name: id
 *        in:body
 *        type:string
 *      description: Delete details of given user id
 *        required:true
 *      schema:
 *        type: object
 *      properties:
 *        name:
 *          type:string
 *          example: "John"
 *        email:
 *          type:string
 *          example: "john@gmail.com"
 *        password:
 *          type: string
 *          example: "Test@1 
 *      
 *    produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: Array of audience builder
 *          schema:
 *            $ref:'#/definitions/UserByIdGetResponse'                
 */

router.post('/', authMiddleware(USER, 'read'), validationHandler(validation.create), UserController.create);
router.post('/login', validationHandler(validation.create), UserController.login);

router.put('/:id', authMiddleware(HEAD_TRAINER, 'write'), validationHandler(validation.update), UserController.update);

/**
 * @swagger
 * /user:
 *    delete:
 *      security:
 *        - APIKeyHeader:[]
 *       tags:
 *          - User
 *        description: Delete user by id
 *        parameters:
 *          - name:id
 *            in: path
 *            types: string
 *            description: Delete details of given user id
 *            required: true
 *        produces:
 *          - application/json
 *        responses:
 *          200:
 *            description: User delete
 *            schema:
 *              $ref: '#/definitions/UserByIdGetResponse'
 */

router.delete('/:id', authMiddleware(USER, 'read'), validationHandler(validation.delete), UserController.delete);
router.post('/createToken', UserController.createToken);
export default router;

