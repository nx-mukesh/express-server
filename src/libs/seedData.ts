import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();

const seedData = async () => {
  try {
    const result = await userRepository.countData();
    console.log('result', typeof result);
    if (result === 0) {
      console.log('data seeding in progress...');

      // Initial User data
      const initialData = [
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
    }
  } catch (err) {
    console.log(err);
  }
};

export { seedData, userRepository };
