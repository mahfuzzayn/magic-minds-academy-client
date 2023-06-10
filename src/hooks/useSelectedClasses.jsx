import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSelectedClasses = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [], refetch } = useQuery({
        queryKey: ["cart", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure(
                `/selected-classes?email=${user?.email}`
            );
            return res.data;
        },
    });
    return [selectedClasses, refetch];
};

export default useSelectedClasses;
