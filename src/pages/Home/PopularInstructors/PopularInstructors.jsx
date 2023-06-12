import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import useInstructorsData from "../../../hooks/useInstructorsData";

const PopularInstructors = () => {
    const [instructors] = useInstructorsData();

    return (
        <div className="popular-instructors mx-5">
            <SectionTitle heading="Popular Instructors"></SectionTitle>
            <div className="instructors-container container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 mx-auto">
                {instructors.map((instructor) => (
                    <motion.div
                        key={instructor?._id}
                        className="bg-red-100 rounded-full max-w-[300px]"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <div className="picture">
                            <img
                                src={instructor?.photoURL}
                                className="object-cover w-full rounded-full"
                                alt=""
                            />
                        </div>
                        <Fade>
                            <h2 className="text-xl sm:text-2xl font-bold m-2 mb-4 text-center">
                                {instructor?.name}
                            </h2>
                        </Fade>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PopularInstructors;
