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

const PaymentHistory = () => {
    const [enrolledClasses] = useEnrolledClasses();
    useTitle("Dashboard");

    return (
        <div className="users mx-5">
            <SectionTitle
                heading="Payment History"
                description="Welcome to the Payment History section! In this section, you can view and track your payment history for the classes you have availed. It provides you with a comprehensive overview of your past transactions, allowing you to keep track of your financial records related to your educational pursuits."
            ></SectionTitle>
            <div className="max-w-[1280px] w-full mx-auto border-2 border-red-100 rounded-lg p-4">
                <TableContainer>
                    <Table variant="simple">
                        <Thead bg="red.100" borderRadius={2}>
                            <Tr>
                                <Th>No.</Th>
                                <Th>Image</Th>
                                <Th>Name</Th>
                                <Th>Transaction ID</Th>
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
                                    <Td>
                                        <span className="bg-green-500 text-white px-2 py-0.5 rounded-md">
                                            {currentClass?.transactionId}
                                        </span>
                                    </Td>
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

export default PaymentHistory;
