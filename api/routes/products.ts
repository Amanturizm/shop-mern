import express from 'express';
import Product from '../models/Product';
import mongoose from 'mongoose';

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

export default productsRouter;