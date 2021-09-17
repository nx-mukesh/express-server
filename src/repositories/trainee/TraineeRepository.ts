import * as mongoose from 'mongoose';
import { traineeModel } from './TraineeModel';
import ITraineeModel from './ITraineeModel';

export default class TraineeRepository {
  public static generateObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  public findOne(query): mongoose.Query<ITraineeModel, ITraineeModel> {
    return traineeModel.findOne(query).lean();
  }

  public find(
    query,
    projection?: any,
    option?: any
  ): mongoose.Query<ITraineeModel[], ITraineeModel> {
    return traineeModel.find(query, projection, option);
  }

  public count(): mongoose.Query<number, ITraineeModel> {
    return traineeModel.count();
  }

  public create(data: any): Promise<ITraineeModel> {
    console.log('TraineeRepository :: create data', data);
    const id = TraineeRepository.generateObjectId();
    const model = new traineeModel({
      _id: id,
      ...data,
    });
    return model.save();
  }

  public update(data: any): mongoose.UpdateQuery<ITraineeModel> {
    console.log('TraineeRepository:: Update - data', data);
    return traineeModel.updateOne(data);
  }
}
