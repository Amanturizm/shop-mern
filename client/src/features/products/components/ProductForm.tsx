import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, MenuItem, Select, SelectChangeEvent, TextField, Typography, } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { TProductRequest } from '../../../types';
import FileInput from '../../../components/UI/FileInput';
import { LoadingButton } from '@mui/lab';
import { createProduct } from '../productsThunk';

const initialState: TProductRequest = {
  title: '',
  description: '',
  price: '',
  image: null,
  category: '',
};

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { productFormLoading } = useAppSelector(state => state.products);
  const { categories } = useAppSelector(state => state.categories);

  const [state, setState] = useState<TProductRequest>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (state.image === null) {
        return alert('Image is required!');
      }
      await dispatch(createProduct(state)).unwrap();
      navigate('/');
    } catch {}
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={sendData}
         width="50%"
         display="flex"
         margin="7% auto"
         flexDirection="column"
         gap={2}
    >
      <Typography variant="h3">
        New Product
      </Typography>

      <TextField
        required
        label="Title"
        name="title"
        value={state.title}
        onChange={changeValue}
      />

      <TextField
        required
        multiline rows={3}
        name="description"
        label="Description"
        value={state.description}
        onChange={changeValue}
      />

      <TextField
        required
        label="Price"
        name="price"
        type="number"
        value={state.price}
        onChange={changeValue}
      />

      <Select
        name="category"
        value={state.category}
        onChange={changeValue}
      >
        {
          categories.map(category => (
            <MenuItem value={category.name}>{category.title}</MenuItem>
          ))
        }
      </Select>

      <Box component="div"
           display="flex"
           gap={2}
      >
        <FileInput
          label="image"
          name="image"
          onChange={changeFileValue}
          image={state.image}
        />

        <LoadingButton
          sx={{ width: '100%' }}
          type="submit"
          endIcon={<SendIcon/>}
          loading={productFormLoading}
          loadingPosition="end"
          variant="contained"
        >
          Send
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ProductForm;