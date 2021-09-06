import { Request, Response, NextFunction } from 'express';
import trainee from '.';

class Trainee {
  getTrainee(req: Request, res: Response, next: NextFunction) {
    try {
      const trainee = [
        {
          id: 1,
          name: 'Mukesh',
          address: 'Noida',
          role: 'SD1',
        },
        {
          id: 2,
          name: 'Rajeev',
          address: 'New Delhi',
          role: 'HR',
        },
        {
          id: 3,
          name: 'Narayan Murti',
          address: 'Bengaluru',
          role: 'HOD',
        },
      ];
      return res
        .status(200)
        .send({ message: 'User Fetched Successfully', data: trainee });
    } catch (error) {
      return res.status(500).send({ error: error, message: 'error' });
    }
  }
  // adding new trainee data (POST)
  addTrainee(req: Request, res: Response, next: NextFunction) {
    try {
      let data = [];
      const newTrainee = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        role: req.body.role,
      };
      if (!newTrainee) {
        return res
          .status(400)
          .send({ error: 'error', message: 'trainee data required' });
      }
      data.push(newTrainee);
      return res
        .status(200)
        .send({ status: 200, message: 'Data added successfully' });
    } catch (error) {
      return res.status(500).send({ error: error, message: 'error' });
    }
  }

  // update record - put request ()
  editTrainee(req: Request, res: Response, next: NextFunction) {
    try {
      let data = [];
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
      return res.status(500).send({ error: error, message: 'error' });
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
      let Id = req.params.id;
      let data = trainee.find((item) => item.id == Id);

      return res
        .status(200)
        .send({ message: 'data deleted successfully', deleted: data });
    } catch (error) {
      return res.status(500).send({ error: error, message: 'error' });
    }
  }
}

export default new Trainee();
