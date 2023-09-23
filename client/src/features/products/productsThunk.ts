import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IProduct, IProductFull, TProductRequest } from '../../types';
import { RootState } from '../../app/store';

export const fetchProducts = createAsyncThunk<IProduct[]>(
  'products/fetchAll',
  async () => {
    const { data } = await axiosApi<IProduct[]>('products');

    return data;
  },
);

export const fetchCategoryProducts = createAsyncThunk<IProduct[], string>(
  'products/fetchCategoryAll',
  async (categoryId) => {
    const { data } = await axiosApi<IProduct[]>('products?category=' + categoryId);

    return data;
  },
);

export const fetchProduct = createAsyncThunk<IProductFull, string>(
  'products/fetchOne',
  async (id) => {
    const { data } = await axiosApi('products/' + id);

    return data;
  },
);

export const createProduct = createAsyncThunk<void, TProductRequest, { state: RootState }>(
  'products/createOne',
  async (product, { getState }) => {
    const token = getState().users.user?.token;

    const formData = new FormData();
    const keys = Object.keys(product) as (keyof TProductRequest)[];

    keys.forEach(key => {
      const value = product[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axiosApi.post('products', formData, config);
  },
);

export const deleteProduct = createAsyncThunk<void, string, { state: RootState }>(
  'products/deleteOne',
  async (id, { getState }) => {
    const token = getState().users.user?.token;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axiosApi.delete('products/' + id, config);
  },
);