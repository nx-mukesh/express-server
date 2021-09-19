// import * as mongoose from 'mongoose';
import { Query, Model, UpdateQuery, Types } from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';

class UserRepository extends VersionableRepository<IUserModel, Model<IUserModel>> {
  constructor() {
    super(userModel);
  }
  // static generate mongodb ObjectId
  public static generateObjectId() {
    return String(new Types.ObjectId());
  }

  public findOne(query): Query<IUserModel, IUserModel> {
    return super.findOne(query).lean();
  }

  public find(query, projection?: any, option?: any): Query<IUserModel[], IUserModel> {
    return super.find(query, projection, option);
  }

  public count(): Query<number, IUserModel> {
    return super.count();
  }

  public async create(data: any): Promise<IUserModel> {
    return super.create(data);
  }

  public delete(data): UpdateQuery<IUserModel> {
    return super.softDelete({ originalId: data.originalId, deleteAt: null }, data.originalId);
  }

  public async update(data: any): Promise<IUserModel> {
    console.log('UserRepository:: Update - data', data);
    return super.update(data);
  }
}

export default UserRepository;
