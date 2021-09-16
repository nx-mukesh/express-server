import * as mongoose from 'mongoose';

export default interface ITraineeModel extends mongoose.Document {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
}