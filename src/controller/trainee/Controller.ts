import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import { BCRYPT_SALT_ROUNDS } from '../../libs/constants';
import bcrypt from 'bcrypt';

const traineeRepository: TraineeRepository = new TraineeRepository();

class TraineeController {
  /**
   * @description: Get User data based on Token
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
      }
      const { secret } = config;
      const trainee = await jwt.verify(token, secret);
      console.log('In traineeController-- trainee', trainee);
      const traineeData = await traineeRepository.findOneData({ _id: trainee._id });
      return res.status(200).send({
        message: 'trainee data fetched successfully',
        data: traineeData,
      });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'Something went wrong..!!' });
    }
  }

  /**
   * Get All Trainee data
   * @param req
   * @param res
   * @param next
   * @returns Trainee
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
      }
      const { secret } = config;
      const trainee = await jwt.verify(token, secret);
      console.log('In traineeController-- trainee', trainee);
      const traineeData = await traineeRepository.findData({ deletedAt: undefined });
      return res.status(200).send({
        message: 'trainee data fetched successfully',
        data: traineeData,
      });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'Something went wrong..!!' });
    }
  }
  /**
   * @description Create New Trainee
   * @param req
   * @param res
   * @param next
   * @returns Created New Trainee Data
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return next({
          err: 'Bad Request',
          message: 'email is required',
          status: 400,
        });
      }
      if (!password) {
        return next({
          err: 'Bad Request',
          message: 'Password is required',
          status: 400,
        });
      }
      const hashPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role ? req.body.role : 'trainee',
      };

      const traineeData = await traineeRepository.create(newUser);
      return res
        .status(200)
        .send({ message: 'trainee registered successfully', trainees: traineeData });
    } catch (error) {
      return res.status(500).send({ err: 'Server error', message: 'Internal server error' });
    }
  }

  /**
   * @description Update Existing User Data BY ID
   * @param req
   * @param res
   * @param next
   * @returns Updated trainee data
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const Id = req.params.id;
      console.log('Id====>', Id);
      const traineeData = await traineeRepository.findOneData({ _id: Id });
      console.log('willUpdate', traineeData);
      if (!traineeData) {
        next({ err: 'User Not exist', status: 404 });
      }
      const updatedTrainee = await traineeRepository.update(traineeData);
      return res
        .status(200)
        .send({ message: 'trainee updated successfully', Trainee: updatedTrainee });
    } catch (error) {
      return res.status(500).send({ err: 'Server Error', message: 'Something went wrong' });
    }
  }

  /**
   * @description Delete User Data by respected ID
   * @param req
   * @param res
   * @param next
   * @returns SoftDeleted Data
   */
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const Id = req.params.id;
      const findUser = await traineeRepository.findOneData({ _id: Id });
      console.log('findFor delete in User controller', { findUser });
      const traineeData = await traineeRepository.delete(findUser);
      console.log('deleteData in User controller', { traineeData });
      return res.status(200).send({
        message: 'trainee deleted successfully',
        deleted_User: traineeData,
      });
    } catch (error) {
      return res.status(500).send({ err: 'server error', message: 'Something went Wrong' });
    }
  }
}

export default new TraineeController();
