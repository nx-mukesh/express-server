// const permission = {
//   getUsers: {
//     all: ["head-trainer"],
//     read: ["trainee", "trainer"],
//     write: ["trainer"],
//     delete: [],
//   },
// };

// /**
//  * this function check user object has permission of specific task
//  * @param {string} moduleName
//  * @param {string} role
//  * @param {string} permissionType
//  */

// const hasPermission = (moduleName, role, permissionType) => {
//   if (moduleName) {
//     if (moduleName.all.includes(role)) {
//       console.log(`${role} has permission for ${permissionType}`);
//       return true
//     }
    
//   }
//   return "Module not found";
// };



// console.log(hasPermission(permission.getUsers, "head-trainer", "read"));
// console.log(hasPermission(permission.getUsers, "trainer", "read"));
// console.log(hasPermission(permission.getUsers, "trainee", "write"));
