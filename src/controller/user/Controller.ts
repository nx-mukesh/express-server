import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import config from '../../config/configuration';
import * as jwt from 'jsonwebtoken';
import { BCRYPT_SALT_ROUNDS } from '../../libs/constants';
import * as bcrypt from 'bcrypt';

const userRepository: UserRepository = new UserRepository();

class UserController {
	/**
	 * @description: Get User data based on Token
	 * @param req
	 * @param res
	 * @param next
	 * @returns
	 */
	public async get(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.header('Authorization');
			if (!token) {
				return next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
			}
			const { secret } = config;
			const user = await jwt.verify(token, secret);
			console.log('In userController-- user', user);
			const userData = await userRepository.findOneData({ _id: user._id });
			return res.status(200).send({
				message: 'user data fetched successfully',
				data: userData,
			});
		} catch (error) {
			return res.status(500).send({ err: error, message: 'Something went wrong..!!' });
		}
	}

	/**
	 * Get All Users data
	 * @param req
	 * @param res
	 * @param next
	 * @
	 * @returns Users
	 */
	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.header('Authorization');
			if (!token) {
				return next({ err: 'Unauthorized', message: 'Token not found', status: 403 });
			}
			const { secret } = config;
			const user = await jwt.verify(token, secret);
			console.log('In userController-- user', user);
			const userData = await userRepository.findData({ deletedAt: undefined });
			return res.status(200).send({
				message: 'user data fetched successfully',
				data: userData,
			});
		} catch (error) {
			return res.status(500).send({ err: error, message: 'Something went wrong..!!' });
		}
	}
	/**
	 * @description Create New User
	 * @param req
	 * @param res
	 * @param next
	 * @returns Created NewUser Data
	 */
	public async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			if (!email) {
				return next({
					err: 'Bad Request',
					message: 'email is required',
					status: 400,
				});
			}
			if (!password) {
				return next({
					err: 'Bad Request',
					message: 'Password is required',
					status: 400,
				});
			}
			const hashPassword = await bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
			console.log({ hashPassword });

			const newUser = {
				name: req.body.name,
				email: req.body.email,
				password: hashPassword,
				role: req.body.role ? req.body.role : 'trainee',
			};

			const userData = await userRepository.create(newUser);
			return res.status(200).send({ message: 'user registered successfully', users: userData });
		} catch (error) {
			return res.status(500).send({ err: 'Server error', message: 'Internal server error' });
		}
	}

	/**
	 * @description Update Existing User Data BY ID
	 * @param req
	 * @param res
	 * @param next
	 * @returns Updated user data
	 */
	public async update(req: Request, res: Response, next: NextFunction) {
		try {
			const Id = req.params.id;
			console.log('Id====>', Id);
			const userData = await userRepository.findOneData({ _id: Id });
			console.log('willUpdate', userData);
			if (!userData) {
				next({ err: 'User Not exist', status: 404 });
			}
			const updateUser = await userRepository.update(userData);
			return res.status(200).send({ message: 'user updated successfully', UserData: updateUser });
		} catch (error) {
			return res.status(500).send({ err: 'Server Error', message: 'Something went wrong' });
		}
	}

	/**
	 * @description Delete User Data by respected ID
	 * @param req
	 * @param res
	 * @param next
	 * @returns SoftDeleted Data
	 */
	public async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const Id = req.params.id;
			const findUser = await userRepository.findOneData({ _id: Id });
			console.log('findFor delete in User controller', { findUser });
			const userData = await userRepository.delete(findUser);
			console.log('deleteData in User controller', { userData });
			return res.status(200).send({
				message: 'user deleted successfully',
				deleted_User: userData,
			});
		} catch (error) {
			return res.status(500).send({ err: 'server error', message: 'Something went Wrong' });
		}
	}

	/**
	 * @description Create Token BY ID and Email
	 * @param req
	 * @param res
	 * @param next
	 * @returns New JWT Token
	 */
	public async createToken(req: Request, res: Response, next: NextFunction) {
		try {
			// const { id, email } = req.body;
			const token = await jwt.sign(req.body, config.secret, { expiresIn: '10h' });
			return res.status(200).send({
				message: 'token successfully created',
				data: { token },
				status: 200,
			});
		} catch (error) {
			return res.status(500).send({ err: 'Server Error', message: 'Something went wrong' });
		}
	}
	/**
	 * Login
	 * @param req
	 * @param res
	 * @param next
	 * @returns Token
	 */
	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const user = await userRepository.findOneData({ deletedAt: null, email: email });
			if (!user) {
				return next({ status: 404, error: 'bad request', message: 'User Not found' });
			}
			const validPassword = bcrypt.compare(password, user.password);
			if (!validPassword) {
				return next({ success: false, message: 'Password not matched' });
			}
			const token = await jwt.sign(req.body, config.secret, { expiresIn: '15m' });
			return res.status(200).send({ success: true, message: 'login success', token: token });
		} catch (error) {
			return res.status(400).send({ error: error, message: 'user id or password is invalid' });
		}
	}
}

export default new UserController();
