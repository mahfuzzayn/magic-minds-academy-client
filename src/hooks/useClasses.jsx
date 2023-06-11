import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useClasses = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {
        data: classes = [],
        refetch,
        isLoading: isClassesLoading,
    } = useQuery({
        queryKey: ["classes", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure("/classes?status=approved");
            return res.data;
        },
    });
    return [classes, isClassesLoading, refetch];
};

export default useClasses;
