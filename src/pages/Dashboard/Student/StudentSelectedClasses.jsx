import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
    Avatar,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    PopoverArrow,
    PopoverBody,
    Portal,
    PopoverTrigger,
    Popover,
    PopoverContent,
} from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSelectedClasses from "../../../hooks/useSelectedClasses";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const StudentSelectedClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const [selectedClasses, refetch] = useSelectedClasses();
    const navigate = useNavigate();
    useTitle("Dashboard");

    const handlePay = (currentClass) => {
        navigate(`/dashboard/payment?classId=${currentClass?.classId}`);
    };

    const handleDelete = (currentClass) => {
        axiosSecure
            .delete(
                `/selected-classes/${currentClass?._id}?email=${currentClass?.userEmail}`
            )
            .then((res) => {
                if (res.data.deletedCount > 0) {
                    refetch();
                    toast.success(
                        `${currentClass?.name} class has been deleted successfully.`,
                        {
                            position: "bottom-right",
                            hideProgressBar: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        }
                    );
                }
            });
    };

    return (
        <div className="users mx-5">
            <SectionTitle
                heading="Selected Classes"
                description="The Selected Classes section is where users can view and manage the classes they have enrolled in. It provides information about the classes they have chosen and allows them to perform actions such as deleting their enrollment."
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
                                <Th>Price</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {selectedClasses.map((currentClass, index) => (
                                <Tr key={currentClass._id}>
                                    <Td>{index + 1}</Td>
                                    <Td>
                                        <Avatar
                                            size="md"
                                            name="I G"
                                            src={currentClass.image}
                                        />
                                    </Td>
                                    <Td>{currentClass?.name}</Td>
                                    <Td>{currentClass?.instructorName}</Td>
                                    <Td>{currentClass?.instructorEmail}</Td>
                                    <Td>${currentClass?.price}</Td>
                                    <Td>
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="w-full bg-yellow-500 text-white p-2 font-semibold rounded-md hover:bg-yellow-400">
                                                    Options
                                                </button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent maxWidth={180}>
                                                    <PopoverArrow />
                                                    <PopoverBody>
                                                        <div className="space-y-4">
                                                            <button
                                                                onClick={() =>
                                                                    handlePay(
                                                                        currentClass
                                                                    )
                                                                }
                                                                className="w-full bg-green-500 text-white p-2 font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400"
                                                            >
                                                                Pay
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        currentClass
                                                                    )
                                                                }
                                                                className="w-full bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400"
                                                            >
                                                                Delete
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

export default StudentSelectedClasses;
