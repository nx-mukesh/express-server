import UserRepository from '../repositories/user/UserRepository';
import { BCRYPT_SALT_ROUNDS, initData } from './constants';
import bcrypt from 'bcrypt';

const userRepository: UserRepository = new UserRepository();

const seedData = async () => {
  try {
    const result = await userRepository.count();
    console.log('result', typeof result);
    if (result === 0) {
      console.log('data seeding in progress...');

      initData.map(async (val) => {
        
        const { password } = val;
        val.password = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        userRepository.create(val);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export { seedData, userRepository };
