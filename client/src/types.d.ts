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

export interface ICategory {
  _id: string;
  name: string;
  title: string;
}

export interface IProduct {
  _id: string;
  user: string;
  category: string;
  title: string;
  description: string;
  price: string;
  image: File | null;
}

export type TProductRequest = Omit<IProduct, '_id' | 'user'>;