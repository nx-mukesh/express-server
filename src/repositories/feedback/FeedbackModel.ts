import * as mongoose from 'mongoose';
import FeedbackSchema from './FeedbackSchema';
import IFeedbackModel from './IFeedbackModel';

export const feedbackSchema = new FeedbackSchema({
  collection: 'feedback',
});

export const feedbackModel: mongoose.Model<IFeedbackModel> = mongoose.model<IFeedbackModel>(
  'Feedback',
  feedbackSchema
);
