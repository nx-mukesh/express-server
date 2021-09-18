import * as mongoose from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
  private model: M;
  constructor(model) {
    this.model = model;
  }

  protected static generateObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  protected findOne(query:any): mongoose.Query<mongoose.EnforceDocument<D, {}>, mongoose.EnforceDocument<D, {}>> {
    console.log('Query::', query);
    const finalQuery = { deletedAt: null, ...query };
    const findOneData = this.model.findOne(finalQuery);
    console.log(findOneData);

    return this.model.findOne(finalQuery);
  }

  protected find(
    query,
    projection?: any,
    options?: any
  ): mongoose.Query<mongoose.EnforceDocument<D, {}>[], mongoose.EnforceDocument<D, {}>> {
    const finalQuery = { deletedAt: null, ...query };
    const findData = this.model.find(finalQuery, projection, options);
    console.log(findData);
    return this.model.find(finalQuery, projection, options);
  }

  protected count(): mongoose.Query<number, mongoose.EnforceDocument<D, {}>> {
    const finalQuery = { deletedAt: null };
    return this.model.count(finalQuery);
  }

  protected create(data: any): Promise<D> {
    console.log('UserRepository :: create data', data);
    const id = VersionableRepository.generateObjectId();
    console.log({ id });
    const model = new this.model({
      _id: id,
      originalId: id,
      ...data,
    });
    return model.save();
  }

  protected softDelete(filter, data): mongoose.Query<any, mongoose.EnforceDocument<D, {}>> {
    return this.model.updateOne(filter, data);
  }

  protected async update(data: any): Promise<D> {
    console.log('UserRepository:: Update - data', data);
    const previousRecord = await this.find({ originalId: data.originalId });
    if (previousRecord) {
      await this.softDelete({ originalId: data.originalId, deleteAt: null }, { deletedAt: Date.now() });
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

