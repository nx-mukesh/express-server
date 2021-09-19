import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import config from '../../config/configuration';
import * as jwt from 'jsonwebtoken';

const userRepository: UserRepository = new UserRepository();

class UserController {
  // ================ GET USER ===========================
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
      }
      const { secret } = config;
      let user;
      user = await jwt.verify(token, secret);
      const userData = await userRepository.findOne({ _id: user.id });
      return res.status(200).send({
        message: 'user data fetched successfully',
        data: userData,
      });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'Something went wrong..!!' });
    }
  }

  //=================  CREATE USER ===============================
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = {
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
      const userData = await userRepository.create(newUser);
      return res.status(200).send({ message: 'user registered successfully', users: userData });
    } catch (error) {
      return res.status(500).send({ err: 'Server error', message: 'internal server error' });
    }
  }

  //=========== UPDATE USER BY ID =======================
  async update(req: Request, res: Response, next: NextFunction) {
    const userData = [];
    try {
      const Id = req.params.id;
      const userData = await userRepository.findOne({ _id: Id });
      if (!userData) {
        next({ err: 'User Not exist', status: 404 });
      }
      const updateUser = await userRepository.update(userData);
      return res.status(200).send({ message: 'user updated successfully', updateUser: updateUser });
    } catch (error) {
      return res.status(500).send({ err: 'Server Error', message: 'Something went wrong' });
    }
  }

  //================= DELETE USER BY ID ===============================
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const Id = req.params.id;
      const userData = await userRepository.delete({ _id: Id });
      return res.status(200).send({
        message: 'user deleted successfully',
        deleted_User: userData,
      });
    } catch (error) {
      return res.status(500).send({ err: 'server error', message: 'Something went Wrong' });
    }
  }

  //================== CREATE TOKEN WITH ID AND EMAIL ====================================
  async createToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, email } = req.body;
      const token = await jwt.sign({ id, email }, config.secret, { expiresIn: '15m' });
      return res.status(200).send({
        message: 'token successfully created',
        data: { token },
        status: 200,
      });
    } catch (error) {
      return res.status(500).send({ err: 'Server Error', message: 'Something went wrong' });
    }
  }
}

export default new UserController();
