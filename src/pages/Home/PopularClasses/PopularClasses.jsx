import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PopularClasses = () => {
    const { data: popularClasses = [] } = useQuery({
        queryKey: ["popular-classes"],
        queryFn: async () => {
            const res = await axios.get(
                "https://magic-minds-academy-server.vercel.app/popular-classes"
            );
            return res.data;
        },
    });

    return (
        <div className="popular-classes mx-5 mt-[130px]">
            <SectionTitle heading="Popular Classes"></SectionTitle>
            <div className="classes-container container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
                {popularClasses.map((currentClass) => (
                    <motion.div
                        key={currentClass?._id}
                        className="bg-blue-100 rounded-lg"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <div className="picture">
                            <img
                                src={currentClass?.image}
                                className="h-[250px] object-cover w-full rounded-lg rounded-b-none"
                                alt=""
                            />
                        </div>
                        <Fade>
                            <div className="flex flex-col mx-5 mt-4 gap-y-4 mb-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-black">
                                    {currentClass?.name}
                                </h2>
                                <p className="font-semibold">
                                    Available Seats:{" "}
                                    {currentClass?.availableSeats}
                                </p>
                                <p className="font-semibold">
                                    Price:{" "}
                                    <span className="bg-red-500 text-white p-1 rounded-md">
                                        ${currentClass?.price}
                                    </span>
                                </p>
                                <Link to="/classes">
                                    <Button colorScheme="blue">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </Fade>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PopularClasses;
