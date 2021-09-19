import { IPermission } from '../interface';

export const TRAINEES: string = 'trainees';
export const TRAINEE: string = 'trainee';
export const USER: string = 'user';
export const TRAINER: string = 'trainer';
export const HEAD_TRAINER: string = 'head-trainer';
export const BCRYPT_SALT_ROUNDS: number = 8;

export const permissions: any = {
  [TRAINEES]: {
    read: [TRAINEE, TRAINER, HEAD_TRAINER],
    write: [TRAINER, HEAD_TRAINER],
    delete: [HEAD_TRAINER],
  },
  [USER]: {
    read: [TRAINEE, TRAINER, HEAD_TRAINER],
  },
};




// Initial User data
export const initData = [
  {
    name: 'Raj',
    email: 'raj@gmail.com',
    role: 'trainee',
    password: 'raj@123',
  },
  {
    name: 'Marry',
    email: 'marry@gmail.com',
    role: 'trainer',
    password: 'marry@123',
  },
];
