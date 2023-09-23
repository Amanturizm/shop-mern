import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useParams } from 'react-router-dom';
import { fetchCategoryProducts, fetchProducts } from './productsThunk';
import { Box } from '@mui/material';

const Products = () => {
  const { category } = useParams() as { category: string };
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    if (!products.length) {
      if (category) {
        dispatch(fetchCategoryProducts(category));
      } else {
        dispatch(fetchProducts());
      }
    }
  }, [products, category, dispatch]);

  return (
    <Box component="div">
      {JSON.stringify(products)}
    </Box>
  );
};

export default Products;