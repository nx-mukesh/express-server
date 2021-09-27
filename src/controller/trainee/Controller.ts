import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../../config/configuration';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import { BCRYPT_SALT_ROUNDS } from '../../libs/constants';

const traineeRepository: TraineeRepository = new TraineeRepository();
class TraineeController {
  /**
   * @description: Get trainee data based on Token
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return next({ status: 403, error: 'Unauthorized', message: 'Token not found' });
      }
      const { secret } = config;
      const trainee = await jwt.verify(token, secret);
      const traineeData = await traineeRepository.findOneData({ _id: trainee._id });
      return res.status(200).send({
        status: 200,
        message: 'trainee data fetched successfully',
        trainee: traineeData,
      });
    } catch (err) {
      return res.status(500).send({ status: 500, error: err, message: 'Something went wrong..!!' });
    }
  }

  /**
   * Get All Users data
   * @param req
   * @param res
   * @param next
   * @
   * @returns Users
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { skip, limit, search } = req.query;
      const trainees = await traineeRepository.findData({ deletedAt: undefined, skip, limit, search });
      const documents = await traineeRepository.count();
      return res.status(200).send({
        status: 200,
        message: 'trainees data fetched successfully',
        traineeCount: documents,
        traineeData: trainees,
      });
    } catch (err) {
      return res.status(500).send({ status: 500, error: err, message: 'Something went wrong..!!' });
    }
  }
  /**
   * @description Create New trainee
   * @param req
   * @param res
   * @param next
   * @returns Created NewUser Data
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return next({
          status: 400,
          err: 'Bad Request',
          message: 'email is required',
        });
      }
      if (!password) {
        return next({
          status: 400,
          err: 'Bad Request',
          message: 'Password is required',
        });
      }
      const hashPassword = await bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
      // console.log(email, hashPassword);
      const newTrainee = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role ? req.body.role : 'trainee',
      };
      const traineeData = await traineeRepository.create(newTrainee);
      return res.status(200).send({ status: 200, message: 'trainee registered successfully', trainees: traineeData });
    } catch (error) {
      return res.status(500).send({ status: 500, error: 'Server error', message: 'Internal server error....' });
    }
  }

  /**
   * @description Update Existing trainee Data BY ID
   * @param req
   * @param res
   * @param next
   * @returns Updated trainee data
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const Id = req.params.id;
      const updateUser = await traineeRepository.update({ originalId: Id, ...req.body });
      return res.status(200).send({ status: 200, message: 'trainee updated successfully', UserData: updateUser });
    } catch (error) {
      return res.status(500).send({ status: 500, error: 'Server Error', message: 'Something went wrong' });
    }
  }

  /**
   * @description Delete trainee Data by respected ID
   * @param req
   * @param res
   * @param next
   * @returns SoftDeleted Data
   */
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const Id = req.params.id;
      const findUser = await traineeRepository.findOneData({ _id: Id });
      const traineeData = await traineeRepository.delete(findUser);
      return res.status(200).send({
        status: 200,
        message: 'trainee deleted successfully',
        result: traineeData,
      });
    } catch (error) {
      return res.status(500).send({ status: 500, error: 'server error', message: 'Something went Wrong' });
    }
  }

  /**
   * @description Create Token BY ID and Email
   * @param req
   * @param res
   * @param next
   * @returns New JWT Token
   */
  public async createToken(req: Request, res: Response, next: NextFunction) {
    try {
      // const { id, email } = req.body;
      const token = await jwt.sign(req.body, config.secret, { expiresIn: '15m' });
      return res.status(200).send({
        message: 'token successfully created',
        data: { token },
        status: 200,
      });
    } catch (error) {
      return res.status(500).send({ status: 500, error: 'Server Error', message: 'Something went wrong' });
    }
  }
  /**
   * Login
   * @param req
   * @param res
   * @param next
   * @returns Token
   */
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const trainee = await traineeRepository.findOneData({ deletedAt: undefined, email: email });
      if (!trainee) {
        return next({ status: 404, error: 'bad request', message: 'trainee Not found' });
      }
      const validPassword = bcrypt.compareSync(password, trainee.password);
      if (!validPassword) {
        return next({ status: 404, message: 'Password does not matched' });
      }
      const _id = trainee._id;
      const traineeCredentials = { email, password, _id };
      const token = await jwt.sign(traineeCredentials, config.secret, { expiresIn: '15m' });
      return res.status(200).send({ status: 200, message: 'Login Successful', data: { token } });
    } catch (err) {
      return res.status(400).send({ status: 400, error: err, message: 'trainee Id or Password is Invalid' });
    }
  }
}

export default new TraineeController();
