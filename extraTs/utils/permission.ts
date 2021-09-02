import permission from "../constants";

/**
 * this function check user object has permission of specific task
 * @param {string} moduleName
 * @param {string} role
 * @param {string} permissionType
 */

const hasPermission = (moduleName, role, permissionType) => {
  const { all, read, write } = permission.getUsers;
  if (all.includes(role)) {
    return true;
  } else if (read.includes(role) && permissionType === "read") {
    return true;
  } else if (write.includes(role) && permissionType === "write") {
    return true;
  }
  return false;
};

export default hasPermission;
