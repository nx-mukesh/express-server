import * as mongoose from 'mongoose';

export default interface IVersionableDocument extends mongoose.Document {
  deletedAt: string;
  originId: string;
  createdAt: string;
}
