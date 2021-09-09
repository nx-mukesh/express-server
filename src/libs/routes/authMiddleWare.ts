import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import hasPermission from '../hasPermission';

const authMiddleware = (module, permissionType) => async (req, res, next) => {
  const token = req.header('Authorization');
  console.log("token-authmiddleware1",token);

  if (!token) {
    next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
  }
  const { secret } = config;
  console.log("secret-auth2",secret);

  let user;
  try {
    user = jwt.verify(token, secret);
    console.log("user 3",user)
  } catch (err) {
    next({
      err: 'Unauthorized',
      message: 'User not Authorized to access',
      status: 403,
    });
  }

  console.log('user is', user);

  if (!user) {
    next({
      err: 'Unauthorized',
      message: 'User not Authorized to access',
      status: 403,
    });
  }
  if (!hasPermission(module, user.role, permissionType)) {
    next({ error: 'Unauthorized', message: 'Permission denied', status: 403 });
  }
  req.user = user;
  next();
};
export default authMiddleware;
