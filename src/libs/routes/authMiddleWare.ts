import * as jwt from 'jsonwebtoken';
import UserRepository from '../../repositories/user/UserRepository';
import config from '../../config/configuration';
import hasPermission from '../hasPermission';

const authMiddleware = (module, permissionType) => async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
  }

  const { secret } = config;
  let user;
  try {
    user = jwt.verify(token, secret);
  } catch (err) {
    next({
      err: 'Unauthorized',
      message: 'User not Authorized to access..!!',
      status: 403,
    });
  }

  console.log('user is..auth=>', user);

  if (!user) {
    next({
      err: 'Unauthorized',
      message: 'User not Authorized to access',
      status: 403,
    });
  }
  const userRepository: UserRepository = new UserRepository();
  const userData = await userRepository.findOne({});
  console.log('++++++====>>> Auth', userData);

  if (!userData) {
    next({
      error: 'unauthorized',
      message: 'permission denied!!',
      status: 403,
    });
  }

  if (!hasPermission(module, user.role, permissionType)) {
    next({
      error: 'Unauthorized',
      message: 'Permission denied',
      status: 403,
    });
  }
  req.user = user;
  next();
};
export default authMiddleware;
