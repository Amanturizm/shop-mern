import { Types } from 'mongoose';

export interface IUser {
  username: string;
  nickname: string;
  phone: string;
  password: string;
  token: string;
}

export interface ICategory {
  name: string;
  title: string;
}

export interface IProduct {
  user: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string;
}