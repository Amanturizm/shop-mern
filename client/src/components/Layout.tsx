import React, { PropsWithChildren } from 'react';
import AppToolbar from './AppToolbar';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>

      <main style={{marginTop: 65}}>
        {children}
      </main>
    </>
  );
};

export default Layout;