import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ICategory } from '../../types';

export const fetchCategories = createAsyncThunk<ICategory[]>(
  'categories/fetchAll',
  async () => {
    const { data } = await axiosApi<ICategory[]>('categories');

    return data;
  },
);