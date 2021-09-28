// import * as mongoose from 'mongoose';
import { Query, Model, UpdateQuery, Types } from 'mongoose';
import { feedbackModel } from './FeedbackModel';
// import { traineeModel } from './TraineeModel';
// import ITraineeModel from './ITraineeModel';
import IFeedbackModel from './IFeedbackModel';
import VersionableRepository from '../versionable/VersionableRepository';

class FeedbackRepository extends VersionableRepository<IFeedbackModel, Model<IFeedbackModel>> {
  constructor() {
    super(feedbackModel);
  }
  public static generateObjectId() {
    return String(new Types.ObjectId());
  }

  public findOneData(query): Query<IFeedbackModel, IFeedbackModel> {
    return super.findOne(query);
  }

  public findData(query, projection?: any, option?: any): Query<IFeedbackModel[], IFeedbackModel> {
    console.log("want to find", query)
    return super.find(query, projection, option);
  }

  public countData(): Query<number, IFeedbackModel> {
    return super.count();
  }

  public async create(data: any): Promise<IFeedbackModel> {
    console.log("feedBack repo", data)
    return super.create(data);
  }

  public delete(data): UpdateQuery<IFeedbackModel> {
    return super.softDelete({ originalId: data.originalId, deletedAt: undefined }, { deletedAt: Date.now() });
  }

  public async update(data: any): Promise<IFeedbackModel> {
    return super.update(data);
  }
}
export default FeedbackRepository;
