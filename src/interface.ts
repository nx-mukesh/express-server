export interface IUsers {
    traineeEmail: string;
    reviewerEmail: string;
  }
  
  export interface IPermission {
    [GET_USERS: string]: {
      all: string[];
      read: string[];
      write: string[];
      delete: string[];
    };
  }
  