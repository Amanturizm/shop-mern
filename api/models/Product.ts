import mongoose, { HydratedDocument, Types } from 'mongoose';
import Category from './Category';
import User from './User';
import { IProduct } from '../types';

const ProductSchema = new mongoose.Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  category: {
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: 'Category does not exist!',
    },
  },
  title: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (this: HydratedDocument<IProduct>) {
        return !(!this.title);
      },
      message: 'Title is required!'
    },
  },
  description: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (this: HydratedDocument<IProduct>) {
        return !(!this.description);
      },
      message: 'Description is required!'
    },
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (this: HydratedDocument<IProduct>) {
        return !(!this.price);
      },
      message: 'Price is required!'
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (this: HydratedDocument<IProduct>) {
       return !(!this.image);
      },
      message: 'Image is required!'
    },
  },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;