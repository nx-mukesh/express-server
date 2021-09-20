import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';

const traineeRepository: TraineeRepository = new TraineeRepository();

class TraineeController {
  /**
   * @description: Get Trainee data based on Token
   * @param req
   * @param res
   * @param next
   * @returns One trainee data
   */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { skip = 0, limit = 10 } = req.query;
      const role = { role: 'trainee' };
      const token = req.header('Authorization');
      if (!token) {
        return next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
      }
      const { secret } = config;
      const trainee = jwt.verify(token, secret);
      if (!trainee) {
        return next({ err: 'Unauthorized', message: 'You are not allowed', status: 403 });
      }
      const traineeCount = await traineeRepository.countData();
      const traineeData = await traineeRepository.findData({ skip, limit, role });
      const data = [{ traineeCount, traineeData }];
      return res.status(200).send({
        message: 'trainee data fetched successfully',
        data: data,
      });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'Something went wrong..!!' });
    }
  }

  /**
   * @description CREATE TRAINEE BY ID
   * @param req
   * @param res
   * @param next
   * @returns New Trainee data
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newTrainee = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role ? req.body.role : 'trainee',
      };
      const { id, email } = req.body;
      if (!id) {
        return next({
          err: 'Bad Request',
          message: 'Id is required',
          status: 400,
        });
      }
      if (!email) {
        return next({
          err: 'Bad Request',
          message: 'email is required',
          status: 400,
        });
      }
      const newTraineeData = await traineeRepository.create(newTrainee);
      return res
        .status(200)
        .send({ message: 'trainee registered successfully', Trainee: newTraineeData });
    } catch (error) {
      return res.status(500).send({ err: 'Server error', message: 'internal server error' });
    }
  }

  /**
   * @description Update Trainee Data
   * @param req
   * @param res
   * @param next
   * @returns Updated Result
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const Id = req.params.id;
      const traineeData = await traineeRepository.findOneData({ _id: Id });
      if (!traineeData) {
        next({ err: 'trainee Not exist', status: 404 });
      }
      const updateTrainee = await traineeRepository.update(traineeData);
      return res
        .status(200)
        .send({ message: 'trainee updated successfully', updateTrainee: updateTrainee });
    } catch (error) {
      return res.status(500).send({ err: 'Server Error', message: 'Something went wrong' });
    }
  }

  /**
   * @description Soft delete Trainee data
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const Id = req.params.id;
      const traineeData = await traineeRepository.delete({ _id: Id });
      return res.status(200).send({
        message: 'Trainee deleted successfully',
        deleted_data: traineeData,
      });
    } catch (error) {
      return res.status(500).send({ err: 'server error', message: 'Something went Wrong' });
    }
  }

  /**
   * @description GET ALL TRAINEE ARRAY
   * @param req
   * @param res
   * @param next
   * @returns array of trainee data
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
      }
      const { secret } = config;
      const trainee = jwt.verify(token, secret);
      if (!trainee) {
        return next({ err: 'Unauthorized', message: 'You are not allowed', status: 403 });
      }
      const traineeData = await traineeRepository.findData({ _id: trainee.id });
      return res.status(200).send({
        message: 'trainee data fetched successfully',
        data: traineeData,
      });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'Something went wrong..!!' });
    }
  }
}

export default new TraineeController();
