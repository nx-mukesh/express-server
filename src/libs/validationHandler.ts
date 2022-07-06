// import { checkSchema, validationResult } from 'express-validator/check'; => bug: express-validator version error

const { checkSchema, validationResult } = require('express-validator');

const validationHandler = (validator) => {
  return [
    checkSchema(validator),
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        next({ message: 'Bad Request', status: 422, error: errors.array() });
        // return res.status(400).send({status:400, message:"validation error", error:errors.array()})
      }
      next();
    },
  ];
};

export default validationHandler;
