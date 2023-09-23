import express from 'express';
import Product from '../models/Product';
import mongoose, { HydratedDocument } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import { IProduct } from '../types';
import { imagesUpload } from '../multer';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.category) {
      const products = await Product.find({ category: req.query.category });
      return res.send(products);
    }

    const products = await Product.find();
    return res.send(products);
  } catch (e) {
    return next(e);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return product;
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

productsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const product = new Product({
      user: user._id,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.file ? req.file.filename : null,
    });

    await product.save();
    return res.send(product);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default productsRouter;