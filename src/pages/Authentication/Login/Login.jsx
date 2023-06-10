import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThirdParty from "../ThirdParty/ThirdParty";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const Login = () => {
    const { userLogIn } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        setSuccess("");
        setError("");

        userLogIn(data.email, data.password)
            .then(() => {
                reset();
                setSuccess("Login completed successfully.");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const message = error.message;
                // console.log(error);
                setError(message);
            });
    };

    useTitle("Login");

    return (
        <div className="login my-[130px] mx-5">
            <div className="box bg-gradient-to-r from-red-50 to-blue-50 shadow-lg max-w-xl mx-auto p-10 rounded-lg">
                <h2 className="text-3xl font-bold mb-2 text-center">
                    Login and Get Connected
                </h2>
                <p className="text-center">
                    Welcome back, Magician! Enter the realm of wonders and log
                    in to Magic Minds Academy.
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-4 mt-10"
                >
                    <FormControl isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
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
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                {...register("password", { required: true })}
                            />
                            <InputRightElement width="4.5rem" className="mt-2">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    className="mt-0"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {errors.password?.type === "required" &&
                                "Password is required."}
                        </FormErrorMessage>
                    </FormControl>
                    <div className="form-label">
                        <p>
                            Don't have an Account?{" "}
                            <Link to="/register" className="text-blue-500">
                                Register
                            </Link>
                        </p>
                    </div>
                    <div className="form-label">
                        <input
                            type="submit"
                            className="bg-red-500 px-4 text-white rounded-lg cursor-pointer w-auto mt-0"
                            value="Login"
                        />
                    </div>
                    {success && (
                        <div className="form-label">
                            <p className="text-green-600">{success}</p>
                        </div>
                    )}
                    {error && (
                        <div className="form-label">
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}
                </form>
                <ThirdParty
                    setSuccess={setSuccess}
                    setError={setError}
                ></ThirdParty>
            </div>
        </div>
    );
};

export default Login;
