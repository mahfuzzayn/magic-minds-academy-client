import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ThirdParty from "../ThirdParty/ThirdParty";

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const onSubmit = (data) => console.log(data);

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
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Enter Name"
                            name="name"
                            {...register("name", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                {...register("password", { required: true })}
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
                            className="bg-red-500 px-4 py-2 text-white rounded-lg cursor-pointer"
                            value="Login"
                        />
                    </div>
                </form>
                <ThirdParty></ThirdParty>
            </div>
        </div>
    );
};

export default Login;
