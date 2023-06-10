import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
    Avatar,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Input,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const InstructorClasses = () => {
    const { user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [axiosSecure] = useAxiosSecure();
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentModalClass, setCurrentModalClass] = useState(null);
    const { data: classes = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/classes");
            return res.data;
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const filteredClassData = Object.entries(data).reduce(
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
        const validatedFilteredClassData = Object.entries(data).reduce(
            (acc, [key, value]) => {
                if (
                    value != currentModalClass[key] &&
                    typeof value === "string" &&
                    key !== "image" &&
                    key !== "name"
                ) {
                    acc[key] = parseFloat(value);
                } else if (value != currentModalClass[key]) {
                    acc[key] = value;
                }
                return acc;
            },
            {}
        );
        if (Object.keys(validatedFilteredClassData).length !== 0) {
            axiosSecure
                .patch(`/classes/instructor/${currentModalClass?._id}`, {
                    action: "updateClass",
                    updatedClass: filteredClassData,
                })
                .then((res) => {
                    refetch();
                    if (res.data.modifiedCount > 0) {
                        reset();
                        onClose();
                        setIsFeedbackModalOpen(false);
                        setIsUpdateModalOpen(false);
                        toast.success(
                            `${currentModalClass?.name} class has been updated successfully.`,
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
        } else {
            reset();
            onClose();
            setIsFeedbackModalOpen(false);
            setIsUpdateModalOpen(false);
            toast.warning(
                `No changes were made to ${currentModalClass?.name}.`,
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
        <div className="users mx-5">
            <SectionTitle
                heading="My Classes"
                description="Welcome to the My Classes section of Magic Minds Academy!. This section is designed specifically for you, providing a comprehensive overview and management of the classes you have added."
            ></SectionTitle>
            <div className="max-w-[1280px] w-full mx-auto border-2 border-red-100 rounded-lg p-4">
                <TableContainer>
                    <Table variant="simple">
                        <Thead bg="red.100" borderRadius={2}>
                            <Tr>
                                <Th>No.</Th>
                                <Th>Image</Th>
                                <Th>Name</Th>
                                <Th>Available Seats</Th>
                                <Th>Price</Th>
                                <Th>Status</Th>
                                <Th>Enrolled Students</Th>
                                <Th>Feedback</Th>
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
                                    <Td>{currentClass?.availableSeats}</Td>
                                    <Td>${currentClass?.price}</Td>
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
                                    <Td textAlign="center">
                                        {currentClass?.enrolledStudents}
                                    </Td>
                                    <Td>
                                        <button
                                            disabled={
                                                currentClass?.status ===
                                                "pending"
                                            }
                                            onClick={() => {
                                                setIsFeedbackModalOpen(
                                                    !isFeedbackModalOpen
                                                );
                                                setCurrentModalClass(
                                                    currentClass
                                                );
                                                onOpen();
                                            }}
                                            className="w-full bg-yellow-500 text-white p-2 font-semibold rounded-md hover:bg-yellow-400 disabled:bg-gray-500"
                                        >
                                            {currentClass?.status !== "pending"
                                                ? "See Feedback"
                                                : "No Feedback"}
                                        </button>
                                    </Td>
                                    <Td>
                                        <button
                                            onClick={() => {
                                                setIsUpdateModalOpen(
                                                    !isUpdateModalOpen
                                                );
                                                setCurrentModalClass(
                                                    currentClass
                                                );
                                                onOpen();
                                            }}
                                            className="w-full bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-400"
                                        >
                                            Update
                                        </button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <div className="feedback-modal">
                    {isFeedbackModalOpen ? (
                        <Modal
                            size="xl"
                            isCentered
                            onClose={() => {
                                if (isFeedbackModalOpen) {
                                    setIsFeedbackModalOpen(
                                        !isFeedbackModalOpen
                                    );
                                } else if (isUpdateModalOpen) {
                                    setIsUpdateModalOpen(!isUpdateModalOpen);
                                }
                                onClose();
                                setCurrentModalClass(null);
                                reset();
                            }}
                            isOpen={isOpen}
                            motionPreset="slideInBottom"
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>See Feedback</ModalHeader>
                                <ModalCloseButton />
                                <div
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-y-4 mt-5"
                                >
                                    <ModalBody>
                                        <h2>
                                            <span className="font-semibold">
                                                Class Name:
                                            </span>{" "}
                                            {currentModalClass?.name}
                                        </h2>
                                        <h2>
                                            <span className="font-semibold">
                                                Instructor Email:
                                            </span>{" "}
                                            <span className="text-red-500">
                                                {
                                                    currentModalClass?.instructorEmail
                                                }
                                            </span>
                                        </h2>
                                        <h2 className="mt-2">
                                            <span className="text-xl font-semibold">
                                                Feedback
                                            </span>
                                        </h2>
                                        <div className="border-2 border-red-100 p-3 rounded-md mt-2">
                                            <p className="leading-7">
                                                {currentModalClass?.status ===
                                                "pending"
                                                    ? "No feedback."
                                                    : currentModalClass?.feedback
                                                    ? currentModalClass?.feedback
                                                    : "No feedback provided."}
                                            </p>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <div className="space-div my-4"></div>
                                    </ModalFooter>
                                </div>
                            </ModalContent>
                        </Modal>
                    ) : isUpdateModalOpen ? (
                        <Modal
                            size="xl"
                            isCentered
                            onClose={() => {
                                if (isFeedbackModalOpen) {
                                    setIsFeedbackModalOpen(
                                        !isFeedbackModalOpen
                                    );
                                } else if (isUpdateModalOpen) {
                                    setIsUpdateModalOpen(!isUpdateModalOpen);
                                }
                                onClose();
                                setCurrentModalClass(null);
                                reset();
                            }}
                            isOpen={isOpen}
                            motionPreset="slideInBottom"
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>
                                    Update Class - {currentModalClass?.name}
                                </ModalHeader>
                                <ModalCloseButton />
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-y-4 mt-5 px-10 pb-10"
                                >
                                    <FormControl isInvalid={errors.name}>
                                        <FormLabel>Class Name</FormLabel>
                                        <Input
                                            placeholder="Enter class name"
                                            name="name"
                                            type="text"
                                            defaultValue={
                                                currentModalClass?.name
                                            }
                                            {...register("name", {
                                                required: true,
                                            })}
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
                                            defaultValue={
                                                currentModalClass?.image
                                            }
                                            type="text"
                                            {...register("image", {
                                                required: true,
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.image?.type ===
                                                "required" &&
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
                                    <FormControl
                                        isInvalid={errors.availableSeats}
                                    >
                                        <FormLabel>Available Seats</FormLabel>
                                        <Input
                                            placeholder="Enter available seats"
                                            name="availableSeats"
                                            type="number"
                                            defaultValue={
                                                currentModalClass?.availableSeats
                                            }
                                            min="0"
                                            {...register("availableSeats", {
                                                required: true,
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.image?.type ===
                                                "required" &&
                                                "Available seats is required."}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.price}>
                                        <FormLabel>Price</FormLabel>
                                        <Input
                                            placeholder="Enter price"
                                            name="price"
                                            type="number"
                                            defaultValue={
                                                currentModalClass?.price
                                            }
                                            min="0"
                                            {...register("price", {
                                                required: true,
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.image?.type ===
                                                "required" &&
                                                "Price is required."}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <div className="form-label mt-2">
                                        <input
                                            type="submit"
                                            className="bg-red-500 px-4 py-2 text-white rounded-lg cursor-pointer"
                                            value="Update Class"
                                        />
                                    </div>
                                </form>
                            </ModalContent>
                        </Modal>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default InstructorClasses;
