import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const {user, loader : authLoader} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: role = 'user',
        isLoading: roleLoader,
        refetch,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoader && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data.role
        }
    })

    return {role, roleLoader: authLoader || roleLoader, refetch};
};

export default useUserRole;