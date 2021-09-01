// validate Emails (single user's email)
// const validateEmail = (userEmail) => {
//   if (userEmail) {
//     const regEx = /^[_A-Za-z0-9-||+]+(||.[_A=Za-z0-9-]+)*@successive.tech$/;
//     return regEx.test(userEmail);
//   }
// };

import validateEmail from "./helpers";

// validate user (list of user's emails)
const validateUsers = (users) => {
  // console.log(users);
  const validUsers = [];
  const invalidUsers = [];

  users.forEach((userId) => {
    const traineeEmail = validateEmail(userId.traineeEmail);
    const reviewerEmail = validateEmail(userId.reviewerEmail);

    if (traineeEmail) {
      validUsers.push(userId.traineeEmail);
    } else {
      invalidUsers.push(userId.traineeEmail);
    }

    if (reviewerEmail) {
      validUsers.push(userId.reviewerEmail);
    } else {
      invalidUsers.push(userId.reviewerEmail);
    }
  });
  return {
    validUser: validUsers,
    validCouunt: validUsers.length,
    invalidUser: invalidUsers,
    invalidCouunt: invalidUsers.length,
  };
  // console.log(result)
};

// list of user's emails
const users = [
  {
    traineeEmail: "trainee1@successive.tech",
    reviewerEmail: "reviewer1@successive.tech",
  },
];

let userEmail = "trainee1@successive.tech";

// check Single User
// console.log(validateEmail(userEmail));

// check array of users
console.log(validateUsers(users));

export default validateUsers;
