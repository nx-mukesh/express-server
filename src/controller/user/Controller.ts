import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
// import bcrypt from 'bcrypt';
import config from '../../config/configuration';
import * as jwt from 'jsonwebtoken';

const userRepository: UserRepository = new UserRepository();

class UserController {
  get(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
      }
      const { secret } = config;
      let user;
      user = jwt.verify(token, secret);
      const userData = userRepository.findOne({ _id: user.id });
      return res.status(200).send({
        message: 'user data fetched successfully',
        data: userData,
      });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'Something went wrong..!!' });
    }
  }

  // Create new User
  create(req: Request, res: Response, next: NextFunction) {
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
      const userData = userRepository.create(newUser);
      return res.status(200).send({ message: 'user registered successfully', users: userData });
    } catch (error) {
      return res.status(500).send({ err: 'Server error', message: 'internal server error' });
    }
  }

  //   edit exist user data by id -
  update(req: Request, res: Response, next: NextFunction) {
    const userData = [];
    try {
      const updatedUser = {
        id: req.body.id ? req.body.id : Math.floor(Math.random() * 10),
        name: req.body.name,
        role: req.body.role,
        address: req.body.address,
      };

      if (!updatedUser.id || !updatedUser.name || !updatedUser.role) {
        return res.status(400).send({
          err: 'Bad request',
          message: 'fill all details user Details',
        });
      }
      userData.push(updatedUser);

      return res.status(200).send({ message: 'user updated successfully', data: userData });
    } catch (error) {
      return res.status(500).send({ err: 'Server Error', message: 'Something went wrong' });
    }
  }

  //   delete user by id -
  delete(req: Request, res: Response, next: NextFunction) {
    const userData = [
      { id: '1', name: 'John Milton', role: 'Author', address: 'Washington' },
      { id: '2', name: 'Thomas Crew', role: 'Editor', address: 'New York' },
      { id: '3', name: 'Selena peter', role: 'Singer', address: 'Alaska' },
    ];
    try {
      const Id = req.params.id;
      const toDeleteUser = userData.find((item) => item.id === Id);
      userData.splice(userData.indexOf(toDeleteUser), 1);
      return res.status(200).send({
        message: 'user deleted successfully',
        data: userData,
        deleted_User: toDeleteUser,
      });
    } catch (error) {
      return res.status(500).send({ err: 'server error', message: 'Something went Wrong' });
    }
  }

  // Create JWT token -----
  createToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, email } = req.body;
      const token = jwt.sign({ id, email }, config.secret, { expiresIn: '10h' });
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
