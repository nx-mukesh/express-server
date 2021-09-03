import { IPermission, IUsers } from "./interfaces";

// constant value -
export const permission:IPermission = {
  getUsers: {
  all: ["head-trainer"],
  read: ["trainee", "trainer"],
  write: ["trainer"],
  delete: [],
  },
  };
  
  // export default permission;
  export const users:IUsers[] = [
  {
  traineeEmail: "trainee1@successive.tech",
  reviewerEmail: "reviewer1@successive.tech",
  },
  ];
  