import axios from 'axios';
import React from 'react';

const axiosUserInstance = axios.create({
    baseURL: "http://localhost:5000"
});

const useAxiosUser = () => {
    return axiosUserInstance;
};

export default useAxiosUser;