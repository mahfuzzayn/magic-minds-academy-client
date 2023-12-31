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
} from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useEnrolledClasses from "../../../hooks/useEnrolledClasses";
import useTitle from "../../../hooks/useTitle";
import useClasses from "../../../hooks/useClasses";
import moment from "moment/moment";

const StudentEnrolledClasses = () => {
    const [enrolledClasses] = useEnrolledClasses();
    useTitle("Dashboard");

    // console.log(enrolledClasses, classes);
    // console.log(classes);
    // console.log(classes.find(c => c?._id === ))

    return (
        <div className="users mx-5">
            <SectionTitle
                heading="Enrolled Classes"
                description="Welcome to the Enrolled Classes section!Here, you can view the classes you have enrolled in. This section provides you with easy access to important information about your enrolled classes and allows you to stay organized."
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
                                <Th>Purchase Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {enrolledClasses.map((currentClass, index) => (
                                <Tr key={currentClass._id}>
                                    <Td>{index + 1}</Td>
                                    <Td>
                                        <Avatar
                                            size="md"
                                            name="I G"
                                            src={currentClass?.classImage}
                                        />
                                    </Td>
                                    <Td>{currentClass?.className}</Td>
                                    <Td>{currentClass?.instructorName}</Td>
                                    <Td>{currentClass?.instructorEmail}</Td>
                                    <Td>
                                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded-md">
                                            ${currentClass?.price}
                                        </span>
                                    </Td>
                                    <Td>
                                        {moment(currentClass?.date).format(
                                            "MMMM Do YYYY, h:mm:ss A"
                                        )}
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

export default StudentEnrolledClasses;
