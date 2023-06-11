import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useEnrolledClasses = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: enrolledClasses = [], refetch } = useQuery({
        queryKey: ["enrolledClasses", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure(
                `/enrolled-classes?email=${user?.email}`
            );
            return res.data;
        },
    });
    return [enrolledClasses, refetch];
};

export default useEnrolledClasses;
