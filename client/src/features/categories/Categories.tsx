import React from 'react';
import { Link } from "react-router-dom";
import { useAppSelector } from '../../app/hook';
import { Box, Typography } from '@mui/material';

const Categories: React.FC = () => {
  const { categories } = useAppSelector(state => state.categories);

  return (
    <Box component="div">
      <Typography variant="h6">
        <Link to="/"
              style={{ textDecoration: 'none', color: '#fff' }}
        >
          All items
        </Link>
      </Typography>

      {
        categories.map(category => (
          <Typography variant="h6" key={category._id}>
            <Link to={`/products?category=${category.name}`}
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