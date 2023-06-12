import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useInstructorsData = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: instructors = [], isLoading: isInstructorsLoading } = useQuery({
        queryKey: ["instructors", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/instructors`);
            return res.data;
        },
    });
    return [instructors, isInstructorsLoading];
};

export default useInstructorsData;
