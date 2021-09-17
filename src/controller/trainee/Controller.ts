import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';

class Trainee {
  getTrainee(req: Request, res: Response, next: NextFunction) {
    try {
      const trainee = [
        {
          _id: 1,
          name: 'Mukesh',
          address: 'Noida',
          role: 'SD1',
        },
        {
          _id: 2,
          name: 'Rajeev',
          address: 'New Delhi',
          role: 'HR',
        },
        {
          _id: 3,
          name: 'Narayan Murti',
          address: 'Bengaluru',
          role: 'HOD',
        },
      ];
      return res
        .status(200)
        .send({ message: 'User Fetched Successfully', data: trainee });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'error' });
    }
  }
  // adding new trainee data (POST)
  addTrainee(req: Request, res: Response, next: NextFunction) {
    try {
      const data = [];
      const newTrainee = {
        _id: req.body._id ? req.body._id : Math.floor(Math.random() * 100),
        name: req.body.name,
        email:req.body.email,
        address: req.body.address,
        role: req.body.role,
      };
      if (!newTrainee) {
        return res
          .status(400)
          .send({ error: 'error', message: 'trainee data required' });
      }
      data.push(newTrainee);
      return res.status(200).send({
        status: 200,
        message: 'Data added successfully',
        new_data: data,
      });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'error' });
    }
  }

  // update record - put request ()
  editTrainee(req: Request, res: Response, next: NextFunction) {
    try {
      const data = [];
      const traineeData = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        role: req.body.role,
      };

      if (!traineeData) {
        return res
          .status(400)
          .send({ error: 'error', message: 'data required' });
      }
      data.push(traineeData);
      return res
        .status(200)
        .send({ message: 'record updated', updatedData: data });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'error' });
    }
  }

  // delete request
  deleteTrainee(req: Request, res: Response, next: NextFunction) {
    try {
      const trainee = [
        {
          id: '1',
          name: 'Mukesh',
          address: 'Noida',
          role: 'SD1',
        },
        {
          id: '2',
          name: 'Rajeev',
          address: 'New Delhi',
          role: 'HR',
        },
        {
          id: '3',
          name: 'Narayan Murti',
          address: 'Bengaluru',
          role: 'HOD',
        },
      ];
      const Id = req.params.id;
      const data = trainee.find((item) => item.id === Id);

      return res
        .status(200)
        .send({ message: 'data deleted successfully', deleted: data });
    } catch (error) {
      return res.status(500).send({ err: error, message: 'error' });
    }
  }
  
  // Create JWT token -----
  // createToken(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     console.log('hello');
  //     const token = jwt.sign(req.body, config.secret, { expiresIn: '10h' });
  //     return res.status(200).send({
  //       message: 'token successfully created',
  //       data: { token },
  //       status: 200,
  //     });
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .send({ err: 'Server Error', message: 'Something went wrong' });
  //   }
  // }
}

export default new Trainee();
