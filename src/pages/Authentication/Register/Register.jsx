import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ThirdParty from "../ThirdParty/ThirdParty";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";
import Swal from "sweetalert2";

const Register = () => {
    const { userRegister, userUpdateProfile } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const [show, setShow] = useState(false);
    const onSubmit = (data) => {
        const filteredValues = Object.entries(data).reduce(
            (acc, [key, value]) => {
                if (value !== "") {
                    acc[key] = value;
                }
                return acc;
            },
            {}
        );
        userRegister(data.email, data.password)
            .then(() => {
                reset();
                userUpdateProfile(data.name, data.photo)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Registration completed successfully",
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const password = watch("password");
    useTitle("Register");

    return (
        <div className="login my-[130px] mx-5">
            <div className="box bg-gradient-to-r from-red-50 to-blue-50 shadow-lg max-w-xl mx-auto p-10 rounded-lg">
                <h2 className="text-3xl font-bold mb-2 text-center">
                    Register and Get Enrolled
                </h2>
                <p className="text-center">
                    Join the Magic Minds Academy and embark on an enchanting
                    adventure. Register now to unlock the extraordinary and
                    unleash your magical potential.
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-4 mt-10"
                >
                    <FormControl isInvalid={errors.name}>
                        <FormLabel>
                            Name<span className="text-red-600"> *</span>
                        </FormLabel>
                        <Input
                            placeholder="Enter name"
                            name="name"
                            {...register("name", { required: true })}
                        />
                        <FormErrorMessage>
                            {errors.name?.type === "required" &&
                                "Name is required."}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.email}>
                        <FormLabel>
                            Email<span className="text-red-600"> *</span>
                        </FormLabel>
                        <Input
                            placeholder="Enter email"
                            name="email"
                            type="email"
                            {...register("email", { required: true })}
                        />
                        <FormErrorMessage>
                            {errors.email?.type === "required" &&
                                "Email is required."}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel>
                            Password<span className="text-red-600"> *</span>
                        </FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                {...register("password", {
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*]).{6}/,
                                    required: true,
                                })}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {errors.password?.type === "required" &&
                                "Password is required."}
                        </FormErrorMessage>
                        <FormErrorMessage>
                            {errors.password?.type === "pattern" &&
                                "Password should include a special character,uppercase & minimum 6 characters."}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.confirmPassword}>
                        <FormLabel>
                            Confirm Password
                            <span className="text-red-600"> *</span>
                        </FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Enter confirm password"
                                {...register("confirmPassword", {
                                    validate: (value) => {
                                        return (
                                            value === password ||
                                            "Passwords do not match"
                                        );
                                    },
                                    required: true,
                                })}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {errors.confirmPassword?.type === "required" &&
                                "Confirm password is required."}
                        </FormErrorMessage>
                        <FormErrorMessage>
                            {errors.confirmPassword?.type === "validate" &&
                                "Confirm password doesn't matches to password."}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.photoURL}>
                        <FormLabel>
                            Photo URL<span className="text-red-600"> *</span>
                        </FormLabel>
                        <Input
                            placeholder="Enter photo url"
                            name="photoURL"
                            {...register("photoURL", { required: true })}
                        />
                        <FormErrorMessage>
                            {errors.photoURL?.type === "required" &&
                                "Photo url is required."}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <Select
                            placeholder="Choose your gender"
                            name="gender"
                            {...register("gender", {
                                maxLength: 20,
                            })}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            placeholder="Enter phone number"
                            name="number"
                            type="number"
                            {...register("number", {
                                maxLength: 20,
                            })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input
                            placeholder="Enter address"
                            name="address"
                            type="text"
                            {...register("address", {
                                maxLength: 120,
                            })}
                        />
                    </FormControl>
                    <div className="form-label">
                        <p>
                            Already have an Account?{" "}
                            <Link to="/login" className="text-blue-500">
                                Login
                            </Link>
                        </p>
                    </div>
                    <div className="form-label">
                        <input
                            type="submit"
                            className="bg-red-500 px-4 py-2 text-white rounded-lg cursor-pointer"
                            value="Register"
                        />
                    </div>
                </form>
                <ThirdParty></ThirdParty>
            </div>
        </div>
    );
};

export default Register;
