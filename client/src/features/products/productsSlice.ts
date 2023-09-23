import { IProduct } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoryProducts, fetchProducts } from './productsThunk';

interface State {
  products: IProduct[];
  productsLoading: boolean;
  productFormLoading: boolean;
}

const initialState: State = {
  products: [],
  productsLoading: false,
  productFormLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state: State) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state: State, { payload }) => {
      state.productsLoading = false;
      state.products = payload;
    });
    builder.addCase(fetchProducts.rejected, (state: State) => {
      state.productsLoading = false;
    });

    builder.addCase(fetchCategoryProducts.pending, (state: State) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchCategoryProducts.fulfilled, (state: State, { payload }) => {
      state.productsLoading = false;
      state.products = payload;
    });
    builder.addCase(fetchCategoryProducts.rejected, (state: State) => {
      state.productsLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;