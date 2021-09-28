export default Object.freeze({
  // POST  /api/feedback/create
  create: {
    "attendance.leave": {
      // leave: { required: true },
      // lateCount: { required: true },
      errorMessage: 'Attendance Required',
      required: true,
      number: true,
      in: ['body'],
    },
  //   codeReviewer: {
  //     quality: { required: true },
  //     communication: { required: true },
  //     behaviour: { required: true },
  //     taskDelivery: { required: true },
  //     comprehension: { required: true },
  //     emailCommunication: { required: true },
  //     redmine: { required: true },
  //     number: true,
  //     in: ['body'],
  //     errorMessage: 'All field should be Number',
  //   },
  //   description: {
  //     goodPoint: {
  //       required: false,
  //       string: true,
  //     },
  //     improvementPoint: {
  //       required: false,
  //       string: true,
  //     },
  //     number: true,
  //     in: ['body'],
  //     errorMessage: 'All field required and should be string',
  //   },
  // },
  // delete: {
  //   id: { required: true, errorMessage: 'Id is required', in: ['params'] },
  // },
  // get: {
  //   skip: {
  //     required: false,
  //     default: 0,
  //     number: true,
  //     in: ['query'],
  //     errorMessage: 'Skip is invalid',
  //   },
  //   limit: {
  //     required: false,
  //     default: 10,
  //     number: true,
  //     in: ['query'],
  //     errorMessage: 'Limit is invalid',
  //   },
  // },
  // update: {
  //   id: {
  //     // required: true,
  //     string: true,
  //     in: ['body'],
  //   },
  //   dataToUpdate: {
  //     in: ['body'],
  //     required: true,
  //     // isObject: true,
  //     // custom: (dataToUpdate) => {
  //     //   console.log('dataToUpdate', dataToUpdate);
  //     //   throw { error: 'Error Occurred', message: 'Message' };
  //     // },
  //   },
  },
});
