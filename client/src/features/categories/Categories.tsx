import React from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Box, Typography } from '@mui/material';
import { fetchCategoryProducts, fetchProducts } from '../products/productsThunk';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.categories);

  return (
    <Box component="div">
      <Typography variant="h6">
        <Link to="/"
              style={{ textDecoration: 'none', color: '#fff' }}
              onClick={() => dispatch(fetchProducts())}
        >
          All items
        </Link>
      </Typography>

      {
        categories.map(category => (
          <Typography variant="h6" key={category._id}>
            <Link to={`/products?category=${category.name}`}
                  onClick={() => dispatch(fetchCategoryProducts(category.name))}
                  style={{ textDecoration: 'none', color: '#fff' }}
            >
              {category.title}
            </Link>
          </Typography>
        ))
      }
    </Box>
  );
};

export default Categories;