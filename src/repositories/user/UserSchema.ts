import VersionableSchema from '../versionable/VersionableSchema';
import { userSchema } from './UserModel';
import * as mongoose from 'mongoose';

export default class UserSchema extends VersionableSchema {
  constructor(collections: any) {
    const baseSchema = {
      _id: String,
      name: String,
      email: { type: String, required: true },
      password: String,
      role: String,
      // feedbacks:{type:mongoose.Types.ObjectId, ref:"Feedback"},
    };

    super(baseSchema, collections);
  }
}

