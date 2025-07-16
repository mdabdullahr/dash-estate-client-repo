import axios from 'axios';
import React from 'react';

const axiosPublicInstance = axios.create({
    baseURL: "http://localhost:5000"
});

const useAxiosPublic = () => {
    return axiosPublicInstance;
};

export default useAxiosPublic;