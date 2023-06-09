import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { Card, CardBody, CardFooter, Stack, Image } from "@chakra-ui/react";
import axios from "axios";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import useStudent from "../../hooks/useStudent";

const classesPage = () => {
    const { user, loading } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [isStudent] = useStudent();

    // console.log("isAdmin", isAdmin);
    // console.log("isInstructor", isInstructor);
    // console.log("isStudent", isStudent);

    const { data: classes = [] } = useQuery({
        queryKey: ["classes"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(
                "http://localhost:5000/classes?status=approved"
            );
            return res.data;
        },
    });

    return (
        <div className="classes-container">
            <SectionTitle heading="Classes"></SectionTitle>
            <div className="classes grid grid-cols-1 lg:grid-cols-2 gap-4 mx-5">
                {classes.map((currentClass) => (
                    <Card
                        key={currentClass?._id}
                        direction={{ base: "column", sm: "row" }}
                        overflow="hidden"
                        variant="outline"
                    >
                        <Image
                            objectFit="cover"
                            maxW={{ base: "100%", sm: "200px" }}
                            src={currentClass?.image}
                            alt="Caffe Latte"
                        />
                        <Stack>
                            <CardBody>
                                <h1 className="text-2xl font-bold">
                                    {currentClass?.name}
                                </h1>
                                <div className="class-detail-information mt-2 space-y-4">
                                    <p className="font-semibold">
                                        Instructor:{" "}
                                        <span>
                                            {currentClass?.instructorName}
                                        </span>
                                    </p>
                                    <p className="font-semibold">
                                        Available Seats:{" "}
                                        <span>
                                            {currentClass?.availableSeats}
                                        </span>
                                    </p>
                                    <p className="font-semibold">
                                        Price:{" "}
                                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded-md">
                                            ${currentClass?.price}
                                        </span>
                                    </p>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <button
                                    disabled={isAdmin || isInstructor}
                                    className="bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400"
                                >
                                    Select Class
                                </button>
                            </CardFooter>
                        </Stack>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default classesPage;
