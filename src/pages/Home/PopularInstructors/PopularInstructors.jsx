import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import useInstructorsData from "../../../hooks/useInstructorsData";

const PopularInstructors = () => {
    const [instructors] = useInstructorsData();

    return (
        <div className="popular-instructors mx-5 mt-[130px]">
            <SectionTitle heading="Popular Instructors"></SectionTitle>
            <div className="instructors-container container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 mx-auto">
                {instructors.map((instructor) => (
                    <motion.div
                        key={instructor?._id}
                        className="h-full flex max-w-[300px] flex-col items-center border-2 border-blue-100 rounded-full p-6"
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <div className="picture">
                            <img
                                src={instructor?.photoURL}
                                className="h-[250px] w-[250px] rounded-full object-cover"
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
