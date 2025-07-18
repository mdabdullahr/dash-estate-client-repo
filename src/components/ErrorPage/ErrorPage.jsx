import React, { useEffect } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';

const ErrorPage = () => {
    useEffect(() => {
    document.title = "DashEstate | Error_Page";
  }, []);
    return (
        <div>
            <Navbar></Navbar>
           <img src="https://i.ibb.co/TBGqmCvV/err4.jpg" className="h-[100vh] w-[100vw] object-center" alt="Error Image" />
        </div>
    );
};

export default ErrorPage;