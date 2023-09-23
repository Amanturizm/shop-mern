import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './features/users/Signup';
import Login from './features/users/Login';

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
          {/* isAuthenticated routes */}
        </>
    }
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default useRoutes;