// import { checkSchema, validationResult } from 'express-validator/check'; => bug: express-validator version error

const { checkSchema, validationResult } = require('express-validator/check');

const validationHandler = (validator) => {
  console.log("InValidationHandler", validator)
  return [
    checkSchema(validator),
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        next({ message: 'Bad Request', status: 422, error: errors.array() });
      }
      next();
    },
  ];
};

export default validationHandler;
