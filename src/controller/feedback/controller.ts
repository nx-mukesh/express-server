import { Request, Response, NextFunction } from 'express';
import FeedbackRepository from '../../repositories/feedback/FeedbackRepository';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import UserRepository from '../../repositories/user/UserRepository';
// import { date } from 'joi';
// import user from '../user';

const feedbackRepository: FeedbackRepository = new FeedbackRepository();
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

      const counts = await feedbackRepository.count();
      // const feedbacks = await userRepository.findOneData({ _id: userToken._id });
      console.log("userToken._id",userToken._id)

      const feedbacks = await feedbackRepository.findOneData({ traineeId: userToken._id });
      return res.status(200).send({ status: 200, message: 'feedback fetched', count: counts, data: feedbacks });
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
      // console.log('feedback', feedback.createdAt);
      // console.log('feedbackId', feedback._id);
      // const { _id } = feedback;
      // await userRepository.updateOne({ _id: traineeId }, { $push: { feedbacks: [_id] } }, { new: true, upsert: true });
      // console.log('added Feedback id in userRepo', addFeedback);
      return res.status(200).send({ status: 200, message: 'feedback created successfully', data: feedback });
    } catch (err) {
      return res.status(404).send({ status: 500, error: err, message: 'Something Went Wrong!!' });
    }
  }

  public async updateFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const Id = req.params.id;
      const updateFeedback = await feedbackRepository.update({ _id: Id, ...req.body });
      return res.status(200).send({ status: 200, message: 'user updated successfully', UserData: updateFeedback });
    } catch (error) {
      return res.status(500).send({ status: 500, error: 'Server Error', message: 'Something went wrong' });
    }
  }

  /**
   * @description Delete feedback by Reviewer only
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async deleteFeedback(req: Request, res: Response, next: NextFunction) {
    const Id = req.params.id;
    const feedbackData = await feedbackRepository.findOneData({ _id: Id });
    if (!feedbackData) {
      return next({ status: 401, error: 'Bad Request', message: 'No Feedback exist' });
    }
    const deletedFeedback = await feedbackRepository.delete(feedbackData);
    return res.status(200).send({
      status: 200,
      message: 'feedback deleted Success',
      FeedbackID: deletedFeedback._id,
      deletedAt: deletedFeedback.deletedAt,
    });
  }
}
export default new feedbackControllers();
