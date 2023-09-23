import { ICategory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesThunk';

interface State {
  categories: ICategory[];
  categoriesLoading: boolean;
}

const initialState: State = {
  categories: [],
  categoriesLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, (state: State) => {
      state.categoriesLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state: State, { payload }) => {
      state.categoriesLoading = false;
      state.categories = payload;
    });
    builder.addCase(fetchCategories.rejected, (state: State) => {
      state.categoriesLoading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;