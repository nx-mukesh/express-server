import { Request, Response, NextFunction } from 'express';
import FeedbackRepository from '../../repositories/feedback/FeedbackRepository';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import UserRepository from '../../repositories/user/UserRepository';
import * as mongoose from 'mongoose';

const feedbackRepository: FeedbackRepository = new FeedbackRepository();
// const traineeRepository: TraineeRepository = new TraineeRepository();
const userRepository: UserRepository = new UserRepository();

class feedbackControllers {
  public async getFeedback(req: Request, res: Response, next: NextFunction) {
    /**
     * @description: Get all feedback based on ID
     * @query skip, limit, search
     * @returns array of feedbacks
     */
    try {
      const { secret } = config;
      const token = req.header('Authorization');
      const userToken = await jwt.verify(token, secret);
      console.log('userToken in feedback controller', userToken);
      if (!userToken) {
        return next({ status: 401, error: 'Unauthorized', message: 'permission denied' });
      }
      const userId = userToken._id;
      const { skip, limit, search } = req.query;
      const counts = await feedbackRepository.count();
      const user = await userRepository.findOneData({ _id: userId, deletedAt: undefined });
      console.log('FindUser', user._id);
      if (user.role === 'trainee') {
        const feedbacks = await feedbackRepository.findData(
          { traineeId: userId },
          { skip, limit, search }
        );
        return res
          .status(200)
          .send({ status: 200, message: 'feedback fetched--------', count: counts, data: feedbacks });
      } else {
        const feedbacks = await feedbackRepository.findData(
          {
            feedbackBy: userId,
            deletedAt: undefined,
          },
          { skip, limit, search }
        );
        return res.status(200).send({ status: 200, message: 'feedback fetched', count: counts, data: feedbacks });
      }
    } catch (err) {
      return res.status(404).send({ status: 404, error: err, message: 'Feedback not found' });
    }
  }

  public async createFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const { secret } = config;
      const token = req.header('Authorization');
      const reviewer = await jwt.verify(token, secret);
      const traineeId = req.params.id;
      const trainee = await userRepository.findOneData({ _id: traineeId, deletedAt: undefined });
      if (!trainee) {
        return next({ status: 404, error: 'bad request', message: 'user Not found' });
      }
      if (trainee.role !== 'trainee') {
        return next({ status: 401, error: 'Unauthorized', message: 'Feedback can be post for trainee Only' });
      }
      const feedback = await feedbackRepository.create({
        traineeId: traineeId,
        reviewerId: reviewer._id,
        ...req.body,
      });
      return res.status(200).send({ status: 200, message: 'feedback created successfully', data: feedback });
    } catch (err) {
      return res.status(404).send({ status: 500, error: err, message: 'Something Went Wrong!!' });
    }
  }

  public updateFeedback(req: Request, res: Response, next: NextFunction) {}

  public deleteFeedback(req: Request, res: Response, next: NextFunction) {
    const Id = req.params;
    const feedbackData = feedbackRepository.findOneData({ _id: Id });
    if (!feedbackData) {
      return next({ status: 401, error: 'Bad Request', message: 'No Feedback exist' });
    }
    const deletedFeedback = feedbackRepository.delete(feedbackData);
    return res.status(200).send({});
  }
}
export default new feedbackControllers();
