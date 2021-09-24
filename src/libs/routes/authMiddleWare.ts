import * as jwt from 'jsonwebtoken';
import UserRepository from '../../repositories/user/UserRepository';
import config from '../../config/configuration';
import hasPermission from '../hasPermission';

const userRepository: UserRepository = new UserRepository();
const authMiddleware = (module, permissionType) => async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
  }

  let user;
  const { secret } = config;
  try {
    user = jwt.verify(token, secret);
  } catch (err) {
    next({
      err: 'Unauthorized (token issue)',
      message: 'User not Authorized to access..!!',
      status: 401,
    });
  }

  if (!user) {
    next({
      error: 'unauthorized (token issue 2)',
      message: 'permission denied!!',
      status: 403,
    });
  }
  const userData = await userRepository.findOneData({ _id: user._id });
  if (!userData) {
    next({
      err: 'Unauthorized',
      message: 'User not Authorized to access!!',
      status: 401,
    });
  }

  if (!hasPermission(module, userData.role, permissionType)) {
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
