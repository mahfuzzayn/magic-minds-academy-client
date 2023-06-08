import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    Avatar,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { toast } from "react-toastify";

const AdminClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/classes");
            return res.data;
        },
    });

    const handleStatusApprove = (currentClass) => {
        axiosSecure
            .patch(`/classes/${currentClass?._id}`, { action: "approve" })
            .then((res) => {
                refetch();
                if (res.data.modifiedCount > 0) {
                    toast.success(`${currentClass?.name} status approved.`, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            });
    };

    const handleStatusDeny = (currentClass) => {
        axiosSecure
            .patch(`/classes/${currentClass?._id}`, { action: "deny" })
            .then((res) => {
                refetch();
                if (res.data.modifiedCount > 0) {
                    toast.success(`${currentClass?.name} status denied.`, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            });
    };

    return (
        <div className="users mx-5">
            <SectionTitle
                heading="Manage Classes"
                description="Welcome to the Manage Classes Section of Magic Minds Academy!
                In this section, you have full control over the management classes of the academy."
            ></SectionTitle>
            <div className="max-w-[1280px] w-full mx-auto border-2 border-red-100 rounded-lg p-4">
                <TableContainer>
                    <Table variant="simple">
                        <Thead bg="red.100" borderRadius={2}>
                            <Tr>
                                <Th>No.</Th>
                                <Th>Image</Th>
                                <Th>Name</Th>
                                <Th>Instructor Name</Th>
                                <Th>Instructor Email</Th>
                                <Th>Available Seats</Th>
                                <Th>Price</Th>
                                <Th>Status</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {classes.map((currentClass, index) => (
                                <Tr key={currentClass._id}>
                                    <Td>{index + 1}</Td>
                                    <Td>
                                        <Avatar
                                            size="md"
                                            name="Prosper Otemuyiwa"
                                            src={currentClass.image}
                                        />
                                    </Td>
                                    <Td>{currentClass?.name}</Td>
                                    <Td>{currentClass?.instructorName}</Td>
                                    <Td>{currentClass?.instructorEmail}</Td>
                                    <Td textAlign="right">
                                        {currentClass?.availableSeats}
                                    </Td>
                                    <Td textAlign="right">
                                        ${currentClass?.price}
                                    </Td>
                                    <Td>
                                        <Tag
                                            size="md"
                                            key="md"
                                            variant="solid"
                                            colorScheme={
                                                currentClass?.status ===
                                                "approved"
                                                    ? "green"
                                                    : currentClass?.status ===
                                                      "denied"
                                                    ? "red"
                                                    : "yellow"
                                            }
                                        >
                                            {currentClass?.status}
                                        </Tag>
                                    </Td>
                                    <Td>
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="w-full bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-400">
                                                    Update
                                                </button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent maxWidth={180}>
                                                    <PopoverArrow />
                                                    <PopoverBody>
                                                        <div className="space-y-4">
                                                            <button
                                                                disabled={
                                                                    currentClass?.status ===
                                                                        "approved" ||
                                                                    currentClass?.status ===
                                                                        "denied"
                                                                }
                                                                onClick={() =>
                                                                    handleStatusApprove(
                                                                        currentClass
                                                                    )
                                                                }
                                                                className="w-full bg-green-500 text-white p-2 font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                disabled={
                                                                    currentClass?.status ===
                                                                        "approved" ||
                                                                    currentClass?.status ===
                                                                        "denied"
                                                                }
                                                                onClick={() =>
                                                                    handleStatusDeny(
                                                                        currentClass
                                                                    )
                                                                }
                                                                className="w-full bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400"
                                                            >
                                                                Deny
                                                            </button>
                                                            <button
                                                                disabled={
                                                                    currentClass?.role ===
                                                                        "instructor" ||
                                                                    currentClass?.role ===
                                                                        "admin"
                                                                }
                                                                onClick={() =>
                                                                    handleMakeInstructor(
                                                                        currentClass
                                                                    )
                                                                }
                                                                className="w-full bg-yellow-500 text-white p-2 font-semibold rounded-md hover:bg-yellow-700 disabled:bg-gray-400"
                                                            >
                                                                Send Feedback
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

export default AdminClasses;
