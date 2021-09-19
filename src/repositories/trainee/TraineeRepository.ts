// import * as mongoose from 'mongoose';
import { Query, Model, UpdateQuery, Types } from 'mongoose';
import { traineeModel } from './TraineeModel';
import ITraineeModel from './ITraineeModel';
import VersionableRepository from '../versionable/VersionableRepository';

export default class TraineeRepository extends VersionableRepository<ITraineeModel, Model<ITraineeModel>> {
  constructor() {
    super(traineeModel);
  }
  // static generate mongodb ObjectId
  public static generateObjectId() {
    return String(new Types.ObjectId());
  }

  public findOne(query): Query<ITraineeModel, ITraineeModel> {
    return super.findOne(query).lean();
  }

  public find(query, projection?: any, option?: any): Query<ITraineeModel[], ITraineeModel> {
    return super.find(query, projection, option);
  }

  public count(): Query<number, ITraineeModel> {
    return super.count();
  }

  public async create(data: any): Promise<ITraineeModel> {
    return super.create(data);
  }

  public delete(data): UpdateQuery<ITraineeModel> {
    return super.softDelete({ originalId: data.originalId, deleteAt: null }, data.originalId);
  }

  public async update(data: any): Promise<ITraineeModel> {
    console.log('UserRepository:: Update - data', data);
    return super.update(data);
  }
}
