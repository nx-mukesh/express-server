export default Object.freeze({
  // POST  /api/trainee/create
  create: {
    email: {
      errorMessage: 'email is required',
      required: true,
      string: true,
      in: ['body'],
    },
    password: {
      required: true,
      regex: '',
      in: ['body'],
      errorMessage: 'Password is required',
    },
  },
  delete: {
    id: { required: true, errorMessage: 'Id is required', in: ['params'] },
  },
  get: {
    skip: {
      required: false,
      default: 0,
      number: true,
      in: ['query'],
      errorMessage: 'Skip is invalid',
    },
    limit: {
      required: false,
      default: 10,
      number: true,
      in: ['query'],
      errorMessage: 'Limit is invalid',
    },
  },
  update: {
    id: {
      required: true,
      string: true,
      in: ['Params'],
      errorMessage: 'Id required in Params',
    },
    dataToUpdate: {
      in: ['body'],
      required: true,
      // isObject: true,
      // custom: (dataToUpdate) => {
      //   console.log('dataToUpdate', dataToUpdate);
      //   throw { error: 'Error Occurred', message: 'Message' };
      // },
    },
  },
});
