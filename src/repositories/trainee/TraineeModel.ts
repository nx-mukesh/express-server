import * as mongoose from 'mongoose';
import TraineeSchema from './TraineeSchema';
import ITraineeModel from './ITraineeModel';

export const traineeSchema = new TraineeSchema({
  collection: 'trainee',
});

export const traineeModel: mongoose.Model<ITraineeModel> = mongoose.model<ITraineeModel>(
  'Trainee',
  traineeSchema
);
