// import * as mongoose from 'mongoose';
import { Query, EnforceDocument, Document, Model, Types, UpdateWriteOpResult } from 'mongoose';

export default class VersionableRepository<I extends Document, M extends Model<I>> {
  private model: M;
  constructor(model) {
    this.model = model;
  }
  /**
   * @description Generate Object ID
   * @returns objectID
   */
  protected static generateObjectId() {
    return String(new Types.ObjectId());
  }

  /**
   * @param query
   * @returns one Document
   */
  protected findOne(query: any): Query<EnforceDocument<I, {}>, EnforceDocument<I, {}>, {}, I> {
    const finalQuery = { deletedAt: undefined, ...query };
    console.log('findOne versionRepo', query);
    return this.model.findOne(finalQuery).lean();
  }

  /**
   * @description Find documents
   * @param query
   * @param projection
   * @param options
   * @returns Array of Documents
   */
  protected find(query, projection?: any, options?: any): Query<EnforceDocument<I, {}>[], EnforceDocument<I, {}>> {
    console.log('in findQuery', query);
    console.log('in projection', projection);
    console.log('in options', options);
    const { search = '' } = query;
    const { skip = 0, limit = 10, sortBy = '-createdAt' } = options;
    const finalQuery: any = {
      deletedAt: undefined,
      ...query,
      $or: [
        { name: { $regex: new RegExp(search), $options: 'i' } },
        { email: { $regex: new RegExp(search), $options: 'i' } },
        { role: { $regex: new RegExp(search), $options: 'i' } },
      ],
    };
    console.log('finalQuery', finalQuery);
    return this.model.find(finalQuery, projection, { skip: +skip, limit: +limit }).sort(`${sortBy}`);
  }

  /**
   * @description count Documents
   * @returns Numbers
   */
  public count(): Query<number, EnforceDocument<I, {}>, {}, I> {
    const finalQuery = { deletedAt: undefined };
    return this.model.count(finalQuery);
  }

  /**
   * @description create new Document
   * @param data
   */
  protected create(data: any): Promise<I> {
    const id = VersionableRepository.generateObjectId();
    // console.log("versionable-data", data)
    const model = new this.model({
      _id: id,
      originalId: id,
      ...data,
    });
    // console.log("versionable-model", model)
    return model.save();
  }

  /**
   * @description Soft Delete
   * @param filter
   * @param data
   * @returns deleted date
   */
  protected softDelete(filter, data): Query<any, EnforceDocument<I, {}>> {
    return this.model.updateOne(filter, data);
  }
  /**
   * @description Update previous data
   */
  protected async update(data: any): Promise<I> {
    const previousRecord = await this.findOne({ originalId: data.originalId });
    if (previousRecord) {
      await this.softDelete({ originalId: data.originalId, deleteAt: undefined }, { deletedAt: Date.now() });
    } else {
      return undefined;
    }
    const newData = { ...previousRecord, ...data };
    newData._id = VersionableRepository.generateObjectId();
    delete newData.deletedAt;
    const model = new this.model(newData);
    return model.save();
  }

  protected async updateOne(query, data: any): Promise<I> {
    const previousData = await this.findOne({ _id: query._id, deletedAt: undefined });
    console.log('previousFeedback', previousData);
    if (previousData) {
      return this.model.findOneAndUpdate(query, data);
    } else {
      return undefined;
    }
  }
}
