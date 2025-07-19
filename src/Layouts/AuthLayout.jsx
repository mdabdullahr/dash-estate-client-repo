import React from 'react';
import { Outlet } from 'react-router';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const AuthLayout = () => {
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;