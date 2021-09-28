import * as mongoose from 'mongoose';

export default interface IFeedbackModel extends mongoose.Document {
  trainerId: string;
  reviewerId: string;
  _id: string;
  attendance: {
    leave: number;
    lateCount: number;
  };
  codeReviewer: {
    quality: number;
    communication: number;
    behaviour: number;
    taskDelivery: number;
    comprehension: number;
    emailCommunication: number;
    redmine: number;
  };
  description: {
    goodPoint: [string];
    improvementPoint: [string];
  };
}
