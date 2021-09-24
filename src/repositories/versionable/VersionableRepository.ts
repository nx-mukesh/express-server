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
		const { skip = 0, limit = 10, sortBy = '-createdAt', search = '' } = query;
		const finalQuery: any = {
			deletedAt: undefined,
			$or: [
				{ name: { $regex: new RegExp(search), $options: 'i' } },
				{ email: { $regex: new RegExp(search), $options: 'i' } },
			],
		};
		return this.model.find(finalQuery, projection, { skip: +skip, limit: +limit }).sort(`-${sortBy}`);
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
		const model = new this.model({
			_id: id,
			originalId: id,
			...data,
		});
		console.log({ model });
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
}
