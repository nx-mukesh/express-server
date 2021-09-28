import * as mongoose from 'mongoose';
import VersionableSchema from '../versionable/VersionableSchema';

class FeedbackSchema extends VersionableSchema {
  constructor(collections: any) {
    const baseSchema = {
      traineeId: { type: String, ref: 'trainee', required: true },
      reviewerId: { type: String, ref: 'user', required: true },
      _id: { type: String },
      description: {
        goodPoints: [String],
        improvementRequirement: [String],
      },
      codeReviewer: {
        quality: Number,
        communication: Number,
        behaviour: Number,
        taskDelivery: Number,
        comprehension: Number,
        emailCommunication: Number,
        redmine: Number,
      },
      attendance: {
        leave: Number,
        lateCount: Number,
      },
    };
    super(baseSchema, collections);
  }
}
export default FeedbackSchema;
