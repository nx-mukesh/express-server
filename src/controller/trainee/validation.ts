export default Object.freeze({
  create: {
    required: ['name', 'email', 'password', 'role'],
    name: {
      errorMessage: 'Name can not be Number',
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
      errorMessage: 'Password should be at least 4 character',
      isLength: {
        options: { min: 4 },
      },
      in: ['body'],
    },
    role: {
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
    skip: {
      required: false,
      default: 0,
      isInt: true,
      in: ['query'],
      errorMessage: 'Skip is invalid',
    },
    limit: {
      required: false,
      default: 10,
      isInt: true,
      in: ['query'],
      errorMessage: 'Limit is invalid',
    },
  },
  update: {
    id: {
      required: true,
      in: ['params', 'query'],
      errorMessage: 'Id required',
    },
    dataToUpdate: {
      in: ['body'],
      required: true,
    },
  },
  login: {
    required: ['email', 'password'],
    email: {
      required: true,
      isEmail: {
        bail: true,
      },
      errorMessage: 'email id required',
    },
    password: {
      required: true,
      errorMessage: 'password required',
      in: ['body'],
    },
  },
});
