import { Request, Response, NextFunction } from 'express';
import FeedbackRepository from '../../repositories/feedback/FeedbackRepository';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';

const feedbackRepository: FeedbackRepository = new FeedbackRepository();

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
      const user = await jwt.verify(token, secret);
      console.log("user in feedback controller", user)
      if (!user) {
        return next({ status: 401, error: 'Unauthorized', message: 'permission denied' });
      }
      const userId = user._id;
      const { skip, limit, search } = req.query;
      const counts = await feedbackRepository.count();
      if (user.role === 'trainee') {
        const feedbacks = await feedbackRepository.findData({
          feedbackFor: userId,
          deletedAt: undefined,
          skip,
          limit,
          search,
        });
        return res.status(200).send({ status: 200, message: 'feedback fetched', count: counts, data: feedbacks });
      } else {
        const feedbacks = await feedbackRepository.findData({
          feedbackBy: userId,
          deletedAt: undefined,
          skip,
          limit,
          search,
        });
        return res.status(200).send({ status: 200, message: 'feedback fetched', count: counts, data: feedbacks });
      }
    } catch (err) {
      return res.status(404).send({ status: 404, error: err, message: 'Feedback not found' });
    }
  }

  public async createFeedback(req:Request, res:Response, next:NextFunction) {
    try{
      const feedback = feedbackRepository.create({feedbackTo:req.params, ...req.body})
      console.log("created feedback", feedback)
    }catch(err){
      return res.status(404).send({status:500, error:err, message:"Internal Error..!!"})
    }


  }
  public updateFeedback() {}
  public deleteFeedback() {}
}
export default new feedbackControllers();
