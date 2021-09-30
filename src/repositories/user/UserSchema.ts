import VersionableSchema from '../versionable/VersionableSchema';
import { userSchema } from './UserModel';

export default class UserSchema extends VersionableSchema {
  constructor(collections: any) {
    const baseSchema = {
      _id: String,
      name: String,
      email: { type: String, required: true },
      password: String,
      role: String,
      feedbacks:{type:Array},
    };

    super(baseSchema, collections);
  }
}

