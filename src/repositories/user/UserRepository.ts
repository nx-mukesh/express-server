import { Query, Model, UpdateQuery, Types } from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';

class UserRepository extends VersionableRepository<IUserModel, Model<IUserModel>> {
  constructor() {
    super(userModel);
  }
  public static generateObjectId() {
    return String(new Types.ObjectId());
  }

  public findOneData(query): Query<IUserModel, IUserModel> {
    return super.findOne(query);
  }

  public findData(query, projection?: any, option?: any): Query<IUserModel[], IUserModel> {
    return super.find(query, projection, option);
  }

  public countData(): Query<number, IUserModel> {
    return super.count();
  }

  public async create(data: any): Promise<IUserModel> {
    return super.create(data);
  }

  public delete(data): UpdateQuery<IUserModel> {
    return super.softDelete({ originalId: data.originalId, deletedAt: undefined }, { deletedAt: Date.now() });
  }

  public async update(data: any): Promise<IUserModel> {
    return super.update(data);
  }
  public async updateOne(filter: any, projection?: any, options?: any): Promise<IUserModel> {
    return super.updateOne(filter, projection, options);
  }
}

export default UserRepository;
