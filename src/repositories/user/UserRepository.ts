import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';

export default class UserRepository {
  // static generate mongodb ObjectId
  public static generateObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  public findOne(query): mongoose.Query<IUserModel, IUserModel> {
    return userModel.findOne(query).lean();
  }

  public find(query, projection?: any, option?: any): mongoose.Query<IUserModel[], IUserModel> {
    return userModel.find(query, projection, option);
  }

  public count(): mongoose.Query<number, IUserModel> {
    return userModel.count();
  }

  public async create(data: any): Promise<IUserModel> {
    const id = UserRepository.generateObjectId();
    const model = await new userModel({
      _id: id,
      ...data,
    });
    console.log('UserRepository :: create data', model);
    return model.save();
  }

  public update(data: any): mongoose.UpdateQuery<IUserModel> {
    console.log('UserRepository:: Update - data', data);
    return userModel.updateOne(data);
  }
}
