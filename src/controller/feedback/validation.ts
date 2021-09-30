export default Object.freeze({
  create: {
    required: ['attendance', 'codeReviewer', 'description'],
    'attendance.*': {
      isInt: {
        errorMessage: 'Marks can not be given more or less then 0 to 10',
        options: { min: 0, max: 10 },
      },
      in: ['body'],
    },
    'codeReviewer.*': {
      isInt: {
        errorMessage: 'Marks can not be given more or less then 0 to 10',
        options: { min: 0, max: 10 },
      },
      in: ['body'],
    },
    'description.*': {
      notEmpty: {
        errorMessage: 'Field should not be empty',
        bail: true
      },
      in:['body']
    }
  },
  get: {
    required:false,
    // skip: {
    //   default: 0,
    //   isInt: true,
    //   in: ['query'],
    //   errorMessage: 'Skip is invalid',
    // },
    // limit: {
    //   default: 10,
    //   isInt: true,
    //   in: ['query'],
    //   errorMessage: 'Limit is invalid',
    // },
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
  delete: {
    required: ['id'],
    id: {
      in: ['params', 'query'],
      errorMessage: 'Id required',
    },
    dataToUpdate: {
      in: ['body'],
    },
  },
});
