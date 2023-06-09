import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const InstructorsPage = () => {
    const [axiosSecure] = useAxiosSecure();
    const {data: instructors} = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await axiosSecure('/classes')
            return res.data;
        }
    })

    // console.log(instructors);

    return (
        <div>
            
        </div>
    );
};

export default InstructorsPage;