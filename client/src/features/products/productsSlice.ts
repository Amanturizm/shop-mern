import { IProduct, IProductFull } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, fetchCategoryProducts, fetchProduct, fetchProducts } from './productsThunk';

interface State {
  products: IProduct[];
  productsLoading: boolean;
  currentProduct: IProductFull | null;
  productFormLoading: boolean;
  deleteProductLoading: boolean;
}

const initialState: State = {
  products: [],
  productsLoading: false,
  currentProduct: null,
  productFormLoading: false,
  deleteProductLoading: false,
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

    builder.addCase(createProduct.pending, (state: State) => {
      state.productFormLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state: State) => {
      state.productFormLoading = false;
    });
    builder.addCase(createProduct.rejected, (state: State) => {
      state.productFormLoading = false;
    });

    builder.addCase(fetchProduct.pending, (state: State) => {
      state.currentProduct = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state: State, { payload }) => {
      state.currentProduct = payload;
    });
    builder.addCase(fetchProduct.rejected, (state: State) => {
      state.currentProduct = null;
    });

    builder.addCase(deleteProduct.pending, (state: State) => {
      state.deleteProductLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state: State) => {
      state.deleteProductLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state: State) => {
      state.deleteProductLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;