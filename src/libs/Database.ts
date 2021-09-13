import * as mongoose from 'mongoose';

export default class Database {
  public static open(mongoURL) {
    return new Promise((resolve, reject) => {
      mongoose.connect(mongoURL, (err) => {
        if (err) {
          console.log('Database connection error!!');
          return reject(err);
        }
        console.log('|| Database connected successfully ||');
        return resolve('Database Connected');
      });
    });
  }
}
