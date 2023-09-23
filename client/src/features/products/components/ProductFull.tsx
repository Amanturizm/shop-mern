import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { deleteProduct, fetchProduct, fetchProducts } from '../productsThunk';
import { Box, Button, CardMedia, CircularProgress, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';

const ProductFull = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => state.users);
  const { currentProduct, deleteProductLoading } = useAppSelector(state => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const onDelete = async () => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      await dispatch(fetchProducts()).unwrap();
      navigate('/products');
    } catch {}
  };

  return !currentProduct ? <CircularProgress /> : (
    <Box component="div"
         display="flex"
         gap={4}
         padding="50px"
    >
      <CardMedia
        component="img"
        sx={{ maxWidth: 600 }}
        image={apiUrl + currentProduct.image}
        alt="img"
      />
      <Box component="div">
        <Typography variant="h3">
          {currentProduct.title}
        </Typography>
        <Typography variant="h4">
          {currentProduct.category}
        </Typography>
        <Typography variant="h6">
          {currentProduct.description}
        </Typography>
        <Typography variant="h4">
          {currentProduct.price}$
        </Typography>
        <Box component="div">
          <Typography>
            Seller: {currentProduct.user.nickname}
          </Typography>
          <Typography>
            Phone: {currentProduct.user.phone}
          </Typography>
        </Box>
        {
          user?.nickname === currentProduct.user.nickname &&
          <Button variant="contained"
                  color="error"
                  onClick={onDelete}
                  sx={{
                    ':disabled': {
                      pointerEvents: 'auto',
                      cursor: 'not-allowed',
                    }
                  }}
                  disabled={deleteProductLoading}
          >
            {deleteProductLoading ? <CircularProgress size={25} /> : 'Delete'}
          </Button>
        }
      </Box>
    </Box>
  );
};

export default ProductFull;