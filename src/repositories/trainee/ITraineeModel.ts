import * as mongoose from 'mongoose';

export default interface ITraineeModel extends mongoose.Document {
  originalId: string;
  id: string;
  name: number;
  role: string;
  email: string;
  password: string;
}
