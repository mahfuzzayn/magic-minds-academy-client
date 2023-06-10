import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { Card, CardBody, CardFooter, Stack, Image } from "@chakra-ui/react";
import axios from "axios";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import useStudent from "../../hooks/useStudent";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const classesPage = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [isStudent] = useStudent();
    const navigate = useNavigate();
    const location = useLocation();

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

    const handleSelectClass = (currentClass) => {
        if (!user && !user?.email) {
            navigate("/login", { state: { from: location } });
        }
        if (isStudent) {
            const selectedClass = {
                classId: currentClass?._id,
                userName: user?.displayName,
                userEmail: user?.email,
                name: currentClass?.name,
                image: currentClass?.image,
                price: currentClass?.price,
                instructorName: currentClass?.instructorName,
                instructorEmail: currentClass?.instructorEmail,
            };
            axiosSecure.post("/selected-classes", selectedClass).then((res) => {
                if (res.data.insertedId) {
                    toast.success(
                        `${currentClass?.name} class has been selected.`,
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
        } else if (isAdmin || isInstructor) {
            toast.error(
                `${
                    isAdmin ? "Admin" : isInstructor ? "Instructor" : "Unknown"
                } cannot select any class.`,
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
    };

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
                                        <span className="font-medium">
                                            {currentClass?.instructorName}
                                        </span>
                                    </p>
                                    <p className="font-semibold">
                                        Available Seats:{" "}
                                        <span className="font-medium">
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
                                    onClick={() =>
                                        handleSelectClass(currentClass)
                                    }
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
