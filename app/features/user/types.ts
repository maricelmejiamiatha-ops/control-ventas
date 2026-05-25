export interface IUser {
  fullNameUser: string;
  nitUser: string;
  numberPhoneUser: string;
  codeUser: string;
  emailUser: string;
  numberSucursal: string;
  locality: string;
  numberLocality: string;
  city: string;
}

export interface IUserInfo {
  success: boolean;
  message: string;
  results: IUser;
}

export interface IPassword {
  currentPassword: string;
  newPassword: string;
}
