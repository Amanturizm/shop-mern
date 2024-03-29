import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './features/users/Signup';
import Login from './features/users/Login';
import ProductForm from './features/products/components/ProductForm';
import Products from './features/products/Products';
import ProductFull from './features/products/components/ProductFull';

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<ProductFull />} />
    {
      !isAuthenticated ?
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </> :
        <>
          <Route path="/new-product" element={<ProductForm />} />
        </>
    }
    <Route path="*" element={<Navigate to="/products" />} />
  </Routes>
);

export default useRoutes;