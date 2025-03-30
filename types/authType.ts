export type SignIn = {
    phone: string;
    password: string;
  };
  
  export type Register = {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    roleId: 3;
  };
  
  export type UpdateUser = {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    phone: string;
  };
  
  export type UpdatePassword = {
    userId: number;
    newPassword: string
  };
  