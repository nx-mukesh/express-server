
import VersionableSchema from '../versionable/VersionableSchema';

class FeedbackSchema extends VersionableSchema {
  constructor(collections: any) {
    const baseSchema = {
      feedbackFor: String,
      feedbackBY:String,
      _id: { type: String },
      date: { type: String, default:Date.now() },
      attendance: { 
        leave:Number,
        LateCount: Number,
      },
      CodeReviewer : {
        Quality: Number,
        Communication : Number,
        Behaviour: Number,
        TaskDelivery: Number,
        Comprehension: Number,
        EmailCommunication: Number,
        Redmine:Number
      },
      Description:{
        goodPoints: String,
        ImprovementRequirement: String
      }
    };
    super(baseSchema, collections);
  }
}

export default FeedbackSchema
