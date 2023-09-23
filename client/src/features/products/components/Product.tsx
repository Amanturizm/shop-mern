import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { IProduct } from '../../../types';
import { apiUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: IProduct;
}

const Product: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 300 }} onClick={() => navigate(`/products/${product._id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={140}
          image={apiUrl + product.image}
          alt="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
          >
            {product.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.price}$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;