
import VersionableSchema from '../versionable/VersionableSchema';

class TraineeSchema extends VersionableSchema {
  constructor(collections: any) {
    const baseSchema = {
      _id: { type: String },
      name: { type: String },
      email: { type: String, required: true },
      password: { type: String },
      role: { type: String },
    };
    super(baseSchema, collections);
  }
}

export default TraineeSchema;
