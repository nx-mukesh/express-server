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
      err: 'Unauthorized',
      message: 'User not Authorized to access..!!',
      status: 403,
    });
  }

  if (!user) {
    next({
      error: 'unauthorized',
      message: 'permission denied!!',
      status: 403,
    });
  }
  console.log("Logged user IN AuthMiddle",{user})
  const userData = await userRepository.findOneData({ _id: user._id });
  console.log("inAuthMiddle", {userData})
  if (!userData) {
    next({
      err: 'Unauthorized',
      message: 'User not Authorized to access!!',
      status: 403,
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
