export interface IUser {
  _id: string;
  username: string;
  nickname: string;
  phone: string;
  password: string;
  token: string;
}

export type TUserRegister = Omit<IUser, '_id' | 'token'>;
export type TUserLogin = Omit<IUser, '_id' | 'token' | 'nickname' | 'phone'>;

export interface IRegisterResponse {
  user: IUser;
  message: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  error: string;
  message: string;
  name: string;
  _message: string;
}