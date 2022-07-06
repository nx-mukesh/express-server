export default Object.freeze({
  create: {
    required: ['name', 'email', 'password', 'role'],
    name: {
      errorMessage: 'Name can not be isInt',
      exists: true,
      isString: true,
      isLength: {
        options: { min: 3 },
        errorMessage: 'Name must be at least 3 characters long',
      },
      in: ['body'],
    },
    email: {
      errorMessage: 'Email Id must be correct',
      required: true,
      isEmail: {
        bail: true,
      },
    },
    password: {
      exist: true,
      errorMessage: 'Password should be at least 4 character',
      isLength: {
        options: { min: 4 },
      },
      in: ['body'],
    },
    role: {
      exist: true,
      errorMessage: 'Role required',
      isLength: {
        options: { min: 3 },
      },
    },
  },

  delete: {
    id: { required: true, errorMessage: 'Id is required', in: ['params'] },
  },
  get: {
    required: false,
    skip: {
      default: 0,
      in: ['query'],
      errorMessage: 'Skip is invalid',
    },
    limit: {
      default: 10,
      in: ['query'],
      errorMessage: 'Limit is invalid',
    },
  },
  getAll: {
    required: false,
    skip: {
      default: 0,
      in: ['query'],
      errorMessage: 'Skip is invalid',
    },
    limit: {
      default: 10,
      in: ['query'],
      errorMessage: 'Limit is invalid',
    },
  },
  update: {
    required: ['id'],
    id: {
      in: ['params', 'query'],
      errorMessage: 'Id required',
    },
    dataToUpdate: {
      in: ['body'],
    },
  },
  login: {
    required: ['email', 'password'],
    email: {
      isEmail: {
        bail: true,
      },
      errorMessage: 'email id required',
    },
    password: {
      errorMessage: 'password required',
      in: ['body'],
    },
  },
});
