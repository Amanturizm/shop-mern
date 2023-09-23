import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useLocation } from 'react-router-dom';
import { fetchCategoryProducts, fetchProducts } from './productsThunk';
import { Box, CircularProgress } from '@mui/material';
import Categories from '../categories/Categories';
import Product from './components/Product';

const Products = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query_category = searchParams.get('category');

  const dispatch = useAppDispatch();
  const { products, productsLoading } = useAppSelector(state => state.products);

  useEffect(() => {
    if (!products.length) {
      if (query_category) {
        dispatch(fetchCategoryProducts(query_category));
      } else {
        dispatch(fetchProducts());
      }
    }
  }, [products, query_category, dispatch]);

  return (
    <Box component="div"
         display="flex"
         width="90%"
         margin="10% auto"
         justifyContent="space-between"
    >
      <Categories />

      <Box component="div"
           display="flex"
           width="75%"
           flexWrap="wrap"
           gap={2}
      >
        {
          productsLoading ? <CircularProgress /> :
          products.map(product => (
            <Product product={product} key={product._id} />
          ))
        }
      </Box>
    </Box>
  );
};

export default Products;