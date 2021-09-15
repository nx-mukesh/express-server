import * as mongoose from 'mongoose';

class UserSchema extends mongoose.Schema {
  constructor(collections: any) {
    const baseSchema = {
      _id: { type: String },
      name: { type: String },
      email: { type: String },
      password: { type: String },
      role: { type: String },
    };
    super(baseSchema, collections);
  }
}

export default UserSchema;
