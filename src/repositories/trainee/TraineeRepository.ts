// import * as mongoose from 'mongoose';
import { Query, Model, UpdateQuery, Types } from 'mongoose';
import { traineeModel } from './TraineeModel';
import ITraineeModel from './ITraineeModel';
import VersionableRepository from '../versionable/VersionableRepository';

class TraineeRepository extends VersionableRepository<ITraineeModel, Model<ITraineeModel>> {
  constructor() {
    super(traineeModel);
  }
  public static generateObjectId() {
    return String(new Types.ObjectId());
  }

  public findOneData(query): Query<ITraineeModel, ITraineeModel> {
    return super.findOne(query);
  }

  public findData(query, projection?: any, option?: any): Query<ITraineeModel[], ITraineeModel> {
    return super.find(query, projection, option);
  }

  public countData(): Query<number, ITraineeModel> {
    return super.count();
  }

  public async create(data: any): Promise<ITraineeModel> {
    return super.create(data);
  }

  public delete(data): UpdateQuery<ITraineeModel> {
    return super.softDelete({ originalId: data.originalId, deletedAt: undefined }, { deletedAt: Date.now() });
  }

  public async update(data: any): Promise<ITraineeModel> {
    return super.update(data);
  }
}
export default TraineeRepository;
