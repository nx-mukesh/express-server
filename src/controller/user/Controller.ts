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
				return next({ status: 403, error: 'Unauthorized', message: 'Token not found' });
			}
			const { secret } = config;
			const user = await jwt.verify(token, secret);
			const userData = await userRepository.findOneData({ _id: user._id });
			return res.status(200).send({
				status: 200,
				message: 'user data fetched successfully',
				user: userData,
			});
		} catch (error) {
			return res.status(500).send({ status: 500, error: error, message: 'Something went wrong..!!' });
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
			const { skip, limit, search } = req.query;
			const userData = await userRepository.findData({ deletedAt: undefined, skip, limit, search });
			return res.status(200).send({
				status: 200,
				message: 'users data fetched successfully',
				users: userData,
			});
		} catch (error) {
			return res.status(500).send({ status: 500, error: error, message: 'Something went wrong..!!' });
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
					status: 400,
					err: 'Bad Request',
					message: 'email is required',
				});
			}
			if (!password) {
				return next({
					status: 400,
					err: 'Bad Request',
					message: 'Password is required',
				});
			}
			const hashPassword = await bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
			const newUser = {
				name: req.body.name,
				email: req.body.email,
				password: hashPassword,
				role: req.body.role ? req.body.role : 'trainee',
			};

			const userData = await userRepository.create(newUser);
			return res.status(200).send({ status: 200, message: 'user registered successfully', users: userData });
		} catch (error) {
			return res.status(500).send({ status: 500, error: 'Server error', message: 'Internal server error' });
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
			const updateUser = await userRepository.update({ originalId: Id, ...req.body });
			return res.status(200).send({ status: 200, message: 'user updated successfully', UserData: updateUser });
		} catch (error) {
			return res.status(500).send({ status: 500, error: 'Server Error', message: 'Something went wrong' });
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
			const userData = await userRepository.delete(findUser);
			return res.status(200).send({
				status: 200,
				message: 'user deleted successfully',
			});
		} catch (error) {
			return res.status(500).send({ status: 500, error: 'server error', message: 'Something went Wrong' });
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
			const token = await jwt.sign(req.body, config.secret, { expiresIn: '15m' });
			return res.status(200).send({
				message: 'token successfully created',
				data: { token },
				status: 200,
			});
		} catch (error) {
			return res.status(500).send({ status: 500, error: 'Server Error', message: 'Something went wrong' });
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
			const user = await userRepository.findOneData({ deletedAt: undefined, email: email });
			if (!user) {
				return next({ status: 404, error: 'bad request', message: 'User Not found' });
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return next({ status: 404, message: 'Password does not matched' });
			}
			const _id = user._id;
			const userCredentials = { email, password, _id };
			const token = await jwt.sign(userCredentials, config.secret, { expiresIn: '15m' });
			return res.status(200).send({ status: 200, message: 'Login Successful', data: { token } });
		} catch (error) {
			return res.status(400).send({ status: 400, error: error, message: 'User Id or Password is Invalid' });
		}
	}
}

export default new UserController();
