import React, { useEffect } from 'react';
import useRoutes from './routes';
import { useAppDispatch, useAppSelector } from './app/hook';
import Layout from './components/Layout';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { fetchCategories } from './features/categories/categoriesThunk';

const App = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.users);
  const routes = useRoutes(!!user);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        {routes}
      </ThemeProvider>
    </Layout>
  );
};

export default App;