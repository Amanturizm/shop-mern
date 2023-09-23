import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './features/users/Signup';
import Login from './features/users/Login';
import PostForm from './features/products/components/ProductForm';

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    {/* Other routes */}
    {
      !isAuthenticated ?
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </> :
        <>
          <Route path="/new-post" element={<PostForm />} />
        </>
    }
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default useRoutes;