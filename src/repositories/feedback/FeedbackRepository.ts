// import * as mongoose from 'mongoose';
import { Query, Model, UpdateQuery, Types } from 'mongoose';
import { feedbackModel } from './FeedbackModel';
// import { traineeModel } from './TraineeModel';
// import ITraineeModel from './ITraineeModel';
import IFeedbackModel from './IFeedbackModel';
import VersionableRepository from '../versionable/VersionableRepository';

class FeedbackRepository extends VersionableRepository<IFeedbackModel, Model<IFeedbackModel>> {
  // private model;
  constructor() {
    super(feedbackModel);
  }
  public findOneData(query): Query<IFeedbackModel, IFeedbackModel> {
    return super.findOne(query);
  }

  public findData(query, projection?: any, option?: any): Query<IFeedbackModel[], IFeedbackModel> {
    return super.find(query, projection, option);
  }

  public countData(): Query<number, IFeedbackModel> {
    return super.count();
  }

  public async create(data: any): Promise<IFeedbackModel> {
    return super.create(data);
  }

  public delete(data): UpdateQuery<IFeedbackModel> {
    return super.softDelete({ originalId: data.originalId, deletedAt: undefined }, { deletedAt: Date.now() });
  }

  public async update(data: any): Promise<IFeedbackModel> {
    return super.update(data);
  }
  // public async updateOnly(data: any): Query<IFeedbackModel[], IFeedbackModel> {
  //   return super.updateOneOnly(data);
  // }
}
export default FeedbackRepository;
