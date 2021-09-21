import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();

const seedData = async () => {
  try {
    const result = await userRepository.countData();
    if (result === 0) {
      console.log('data seeding in progress...');
    }
  } catch (err) {
    console.log(err);
  }
};

export { seedData, userRepository };
