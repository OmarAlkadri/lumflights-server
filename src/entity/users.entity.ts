
export interface IUser {
  id: any;
  name: string;


  email: string;
  password: string;
  registrationNumber?: string;

  dateOfBirth?: Date;

  phoneNumber?: string;
  EMaritalStatus?: EMaritalStatus;

  isLoggedOut?: Boolean;
  lastLogin?: Date;
  lastNotificationSeen?: Date;

  ERoles?: ERoles[];
  EUserType: ERoles;


  createdAt: string;
  updatedAt: string;
}

export enum EMaritalStatus {
  Married = 1,
  Single,
}


export enum ERoles {
  Admin = "admin",
  Manager = "manager",
  Field = "staff",
  Employee = "employee",
  Supervisor = "supervisor",
}

export class User implements IUser {
  id: any;

  name!: string;
  phoneNumber?: string;
  registrationNumber?: string;
  dateOfBirth?: Date;


  email!: string;
  password!: string;




  lastLogin?: Date;
  lastNotificationSeen?: Date;
  ERoles?: ERoles[];
  EUserType!: ERoles;


  createdAt!: string;
  updatedAt!: string;
}
