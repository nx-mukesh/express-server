import { Request, Response, NextFunction } from 'express';
import user from '.';

class User {
  //   get User Details
  get(req: Request, res: Response, next: NextFunction) {
    const userData = [
      { id: '1', name: 'John Milton', role: 'Author', address: 'Washington' },
      { id: '2', name: 'Thomas Crew', role: 'Editor', address: 'New York' },
      { id: '3', name: 'Selena peter', role: 'Singer', address: 'Alaska' },
    ];
    try {
      return res.status(200).send({
        message: 'user data fetched successfully',
        data: userData,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ err: error, message: 'Something went wrong' });
    }
  }
  post(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = {
        id: req.body.id ? req.body.id : Math.floor(Math.random() * 10),
        name: req.body.name,
        role: req.body.role,
        address: req.body.address,
      };
      if (!newUser) {
        return res
          .status(400)
          .send({ err: 'Bad request', message: 'user details required' });
      }
      const userData = [];
      userData.push(newUser);
      return res
        .status(200)
        .send({ message: 'user registered successfully', users: userData });
    } catch (error) {
      return res
        .status(500)
        .send({ err: 'Server error', message: 'internal server error' });
    }
  }

  //   edit exist user data by id -
  edit(req: Request, res: Response, next: NextFunction) {
    const userData = [];
    try {
      const updatedUser = {
        id: req.body.id ? req.body.id : Math.floor(Math.random() * 10),
        name: req.body.name,
        role: req.body.role,
        address: req.body.address,
      };

      if (!updatedUser.id || !updatedUser.name || !updatedUser.role) {
        return res
          .status(400)
          .send({
            err: 'Bad request',
            message: 'fill all details user Details',
          });
      }
      userData.push(updatedUser);

      return res
        .status(200)
        .send({ message: 'user updated successfully', data: userData });
    } catch (error) {
      return res
        .status(500)
        .send({ err: 'Server Error', message: 'Something went wrong' });
    }
  }

  //   delete user by id -
  delete(req: Request, res: Response, next: NextFunction) {
    const userData = [
      { _id: '1', name: 'John Milton', role: 'Author', address: 'Washington' },
      { _id: '2', name: 'Thomas Crew', role: 'Editor', address: 'New York' },
      { _id: '3', name: 'Selena peter', role: 'Singer', address: 'Alaska' },
    ];
    try {
      const Id = req.params.id;
      const toDeleteUser = userData.find((item) => item._id === Id);
      userData.splice(userData.indexOf(toDeleteUser), 1);
      return res
        .status(200)
        .send({
          message: 'user deleted successfully',
          data: userData,
          deleted_User: toDeleteUser,
        });
    } catch (error) {
      return res
        .status(500)
        .send({ err: 'server error', message: 'Something went Wrong' });
    }
  }
}

export default new User();
