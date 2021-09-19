// import * as mongoose from 'mongoose';
import { Query, EnforceDocument, Document, Model, Types } from 'mongoose';
import { BCRYPT_SALT_ROUNDS } from '../../libs/constants';
import * as bcrypt from 'bcrypt';

export default class VersionableRepository<I extends Document, M extends Model<I>> {
  private model: M;
  constructor(model) {
    this.model = model;
  }
  // Static GenerateObjectId ===============
  protected static generateObjectId() {
    return String(new Types.ObjectId());
  }

  // FIND-ONE ==============================
  protected findOne(query: any): Query<EnforceDocument<I, {}>, EnforceDocument<I, {}>, {}, I> {
    console.log('Query in findOne::', query);
    const finalQuery = { deletedAt: null, ...query };
    const findOneData = this.model.findOne(finalQuery);
    console.log(findOneData);
    return this.model.findOne(finalQuery).lean();
  }

  // FIND ALL ==============================
  protected find(
    query,
    projection?: any,
    options?: any
  ): Query<EnforceDocument<I, {}>[], EnforceDocument<I, {}>> {
    const finalQuery = { deletedAt: null, ...query };
    const findData = this.model.find(finalQuery, projection, options);
    console.log(findData);
    return this.model.find(finalQuery, projection, options);
  }

  // COUNT ================================
  protected count(): Query<number, EnforceDocument<I, {}>, {}, I> {
    const finalQuery = { deletedAt: null };
    return this.model.count(finalQuery);
  }

  // CREATE-DATA ==========================
  protected create(data: any): Promise<I> {
    console.log('UserRepository :: create data', data);
    const id = VersionableRepository.generateObjectId();
    console.log({ id });
    const hash = bcrypt.hashSync(data.password, BCRYPT_SALT_ROUNDS);
    data.password = hash;
    const model = new this.model({
      _id: id,
      originalId: id,
      ...data,
    });
    return model.save();
  }

  // SOFT-DELETE ===========================
  protected softDelete(filter, data): Query<any, EnforceDocument<I, {}>> {
    return this.model.updateOne(filter, data);
  }

  // UPDATE =================================
  protected async update(data: any): Promise<I> {
    console.log('UserRepository:: Update - data', data);
    const previousRecord = await this.findOne({ originalId: data.originalId });
    if (previousRecord) {
      await this.softDelete(
        { originalId: data.originalId, deleteAt: null },
        { deletedAt: Date.now() }
      );
    } else {
      return null;
    }
    const newData = { ...previousRecord, ...data };
    newData._id = VersionableRepository.generateObjectId();
    delete newData.deletedAt;
    const model = new this.model(newData);
    return model.save();
  }
}
