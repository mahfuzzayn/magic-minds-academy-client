import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

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
        <div className="popular-classes mx-5">
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
                            <h2 className="text-xl sm:text-2xl font-bold m-2 mb-4 text-center">
                                {currentClass?.name}
                            </h2>
                        </Fade>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PopularClasses;
