import { Request, Response, NextFunction } from 'express';
import FeedbackRepository from '../../repositories/feedback/FeedbackRepository';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import UserRepository from '../../repositories/user/UserRepository';
import { date } from 'joi';

const feedbackRepository: FeedbackRepository = new FeedbackRepository();
const userRepository: UserRepository = new UserRepository();

class feedbackControllers {
  public async getFeedback(req: Request, res: Response, next: NextFunction) {
    /**
     * @description: Get all feedback based on ID
     * @query skip, limit, search
     * @returns array of feedbacks
     */

    // get feedback me userRepository me userDocument ke feedback[id:123] ko populate kara dena h
    try {
      const { secret } = config;
      const token = req.header('Authorization');
      const userToken = await jwt.verify(token, secret);
      const userId = userToken._id;
      const counts = await feedbackRepository.count();
      const user = await userRepository.findOneData({ _id: userId });
      if (user.role === 'trainee') {
        const feedbacks = await feedbackRepository.findData({ traineeId: userId });
        return res.status(200).send({ status: 200, message: 'feedback fetched', count: counts, data: feedbacks });
      } else {
        const feedbacks = await feedbackRepository.findData({
          feedbackBy: userId,
        });
        return res.status(200).send({ status: 200, message: 'feedback fetched', count: counts, data: feedbacks });
      }
    } catch (err) {
      return res.status(404).send({ status: 404, error: err, message: 'Feedback not found' });
    }
  }

  public async feedbackDetails(req, res, next) {
    const feedbackId = req.params.id;
  }

  public async createFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const { secret } = config;
      const token = req.header('Authorization');
      const reviewer = await jwt.verify(token, secret);
      const traineeId = req.params.id;
      const trainee = await userRepository.findOneData({ _id: traineeId });
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
      
      const addFeedback = await userRepository.updateOne(
        { _id: traineeId },
        { $push: { feedbacks: [{ feedback: feedback._id, date: new Date()}] } },
        { new: true, upsert: true }
      );
      console.log("added Feedback id in userRepo", addFeedback)
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
