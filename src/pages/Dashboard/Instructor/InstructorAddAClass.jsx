import React, { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const InstructorAddAClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const filteredUserData = Object.entries(data).reduce(
            (acc, [key, value]) => {
                if (
                    typeof value === "string" &&
                    key !== "image" &&
                    key !== "name"
                ) {
                    acc[key] = parseFloat(value);
                } else {
                    acc[key] = value;
                }
                return acc;
            },
            {}
        );
        const newClass = {
            ...filteredUserData,
            instructorName: user?.displayName,
            instructorEmail: user?.email,
            enrolledStudents: 0,
            status: "pending",
        };
        axiosSecure.post("/classes", newClass).then((res) => {
            if (res.data.insertedId) {
                reset();
                toast.success(`${data.name} class added successfully.`, {
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
        <div className="add-a-class">
            <div className="my-[100px] mx-5">
                <SectionTitle
                    heading="Add A Class"
                    description="This section empowers you to create and add new classes to our diverse curriculum, expanding the horizons of knowledge and fostering a love for learning magics."
                ></SectionTitle>
                <div className="box bg-gradient-to-r from-red-50 to-blue-50 shadow-lg max-w-[980px] mx-auto p-10 rounded-lg">
                    <h2 className="text-3xl font-bold mb-2 text-center"></h2>
                    <p className="text-center"></p>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-y-4 mt-10"
                    >
                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Class Name</FormLabel>
                            <Input
                                placeholder="Enter class name"
                                name="name"
                                type="text"
                                {...register("name", { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.name?.type === "required" &&
                                    "Class name is required."}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.image}>
                            <FormLabel>Class Image</FormLabel>
                            <Input
                                placeholder="Enter class image"
                                name="image"
                                type="text"
                                {...register("image", { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.image?.type === "required" &&
                                    "Class image is required."}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Instructor Name</FormLabel>
                            <Input
                                placeholder="Enter instructor name"
                                name="instructorName"
                                type="text"
                                defaultValue={user?.displayName}
                                disabled
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Instructor Email</FormLabel>
                            <Input
                                placeholder="Enter instructor email"
                                name="instructorEmail"
                                type="email"
                                defaultValue={user?.email}
                                disabled
                            />
                        </FormControl>
                        <FormControl isInvalid={errors.availableSeats}>
                            <FormLabel>Available Seats</FormLabel>
                            <Input
                                placeholder="Enter available seats"
                                name="availableSeats"
                                type="number"
                                min="0"
                                {...register("availableSeats", {
                                    required: true,
                                })}
                            />
                            <FormErrorMessage>
                                {errors.image?.type === "required" &&
                                    "Available seats is required."}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.price}>
                            <FormLabel>Price</FormLabel>
                            <Input
                                placeholder="Enter price"
                                name="price"
                                type="number"
                                min="0"
                                {...register("price", { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.image?.type === "required" &&
                                    "Price is required."}
                            </FormErrorMessage>
                        </FormControl>
                        <div className="form-label mt-2">
                            <input
                                type="submit"
                                className="bg-red-500 px-4 py-2 text-white rounded-lg cursor-pointer"
                                value="Add Class"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InstructorAddAClass;
