import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';

export default class UserRepository extends VersionableRepository <IUserModel, mongoose.Model<IUserModel>> {
  
  constructor() {
    super(userModel);
  }
  // static generate mongodb ObjectId
  public static generateObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  public findOne(query): mongoose.Query<IUserModel, IUserModel> {
    return super.findOne(query).lean();
  }

  public find(query, projection?: any, option?: any): mongoose.Query<IUserModel[], IUserModel> {
    return super.find(query, projection, option);
  }

  public count(): mongoose.Query<number, IUserModel> {
    return super.count();
  }

  public async create(data: any): Promise<IUserModel> {
    return super.create(data);
  }

  public delete(data):mongoose.UpdateQuery<IUserModel>{
    return super.softDelete({ originalId: data.originalId, deleteAt: null }, data.originalId)
  }

  public update(data: any): mongoose.UpdateQuery<IUserModel> {
    console.log('UserRepository:: Update - data', data);
    return super.update(data);
  }
}
