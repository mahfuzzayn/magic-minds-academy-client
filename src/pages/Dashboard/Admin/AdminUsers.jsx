import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AdminUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleMakeInstructor = (_id) => {
        axiosSecure.post(`/users/instructor/:id`).then((res) => {
            console.log(res.data);
        });
    };

    const handleMakeAdmin = (_id) => {
        axiosSecure.post(`/users/admin/:id`).then((res) => {
            console.log(res.data);
        });
    };

    return (
        <div className="users mx-5">
            <SectionTitle
                heading="Manage Users"
                description="Welcome to the User Management page! Here, you have the ability to manage user accounts and their roles. You will find a list of users along with their respective email IDs. Take control and update their roles to either admin or instructor based on your requirements."
            ></SectionTitle>
            <div className="max-w-[1280px] w-full mx-auto border-2 border-red-100 rounded-lg p-4">
                <TableContainer>
                    <Table variant="simple">
                        <Thead bg="red.100" borderRadius={2}>
                            <Tr>
                                <Th>No.</Th>
                                <Th>Name</Th>
                                <Th>Email Id</Th>
                                <Th>Role</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user, index) => (
                                <Tr key={user._id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{user?.name}</Td>
                                    <Td>{user?.email}</Td>
                                    <Td>{user?.role}</Td>
                                    <Td>
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="w-full bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-400">
                                                    Update Role
                                                </button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent maxWidth={180}>
                                                    <PopoverArrow />
                                                    <PopoverBody>
                                                        <div className="space-y-4">
                                                            <button
                                                                onClick={() =>
                                                                    handleMakeInstructor(
                                                                        user?._id
                                                                    )
                                                                }
                                                                className="w-full bg-yellow-500 text-white p-2 font-semibold rounded-md hover:bg-yellow-700 disabled:bg-gray-400"
                                                            >
                                                                Make Instructor
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleMakeAdmin(
                                                                        user?.id
                                                                    )
                                                                }
                                                                className="w-full bg-green-500 text-white p-2 font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400"
                                                            >
                                                                Make Admin
                                                            </button>
                                                        </div>
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default AdminUsers;
