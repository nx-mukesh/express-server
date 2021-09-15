import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';


export default class UserRepository {

  public static generationObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  public findOne(query): mongoose.Query<IUserModel, IUserModel> {
    return userModel.findOne(query).lean();
  }

  public find(
    query,
    projection?: any,
    option?: any
  ): mongoose.Query<IUserModel[], IUserModel> {
    return userModel.find(query, projection, option);
  }

  public count(): mongoose.Query<number, IUserModel> {
    return userModel.count();
  }

  public create(data: any): Promise<IUserModel> {
    const id = UserRepository.generationObjectId();
    const model = new userModel({
      _id: id,
      ...data,
    });
    return model.save();
  }

  public update(data: any): mongoose.UpdateQuery<IUserModel> {
    return userModel.updateOne(data);
  }
}
