import UserRepository from '../repositories/user/UserRepository';
// import TraineeRepository from '../repositories/trainee/TraineeRepository';


const userRepository: UserRepository = new UserRepository();
export default () => {
  userRepository
    .count().then((res) => {
      // console.log('res', typeof res);
      if (res === 0) {
        console.log('Data seeding in progress');
        userRepository.create({
          name: 'Head-Trainer',
          role: 'head-trainer',
          email: 'head.trainer@successive.com',
          password: 'headTrainer@123',
        });
        userRepository.create({
          name: 'Trainer',
          role: 'trainer',
          email: 'trainer@successive.com',
          password: 'trainer@123',
        });
      }
    })
    .catch((err) => console.log(err));
};

