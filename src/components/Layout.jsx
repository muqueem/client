import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';

const Layout = () => {
  return (
    <>
      <ProtectedRoute>
        <Header />
        <main className='pt-22'>
          <div className="min-h-[80vh]">
            <Outlet />
          </div>
        </main>
        <Footer />
      </ProtectedRoute>
    </>
  )
}

export default Layout;