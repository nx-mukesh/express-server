import * as mongoose from 'mongoose';

class VersionableSchema extends mongoose.Schema {
  constructor(option: any, collection: any) {
    const versionOption = Object.assign(
      {
        createdAt: { default: Date.now(), type: Date },
        deletedAt: { required: false, type: Date },
        originalId: { required: true, type: String },
      },
      option
    );
    super(versionOption, collection);
  }
}
export default VersionableSchema;
