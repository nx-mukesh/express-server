import * as mongoose from 'mongoose';

export default interface IFeedbackModel extends mongoose.Document {
  feedbackFor:string,
  feedbackBy: string,
  _id: string;
  date: string;
  attendance: {
    leave: number;
    LateCount: number;
  };
  codeReviewer: {
    Quality: number;
    Communication: number;
    Behaviour: number;
    TaskDelivery: number;
    Comprehension: number;
    EmailCommunication: number;
    Redmine: number;
  };
  description:{
    goodPoint:string,
    improvementPoint:string
  }
}
