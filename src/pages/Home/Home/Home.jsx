import React from "react";
import useTitle from "../../../hooks/useTitle";
import SliderSection from "../SliderSection/SliderSection";
import useTheme from "../../../hooks/useTheme";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
    const { theme } = useTheme();
    useTitle();

    return (
        <div className={`home ${theme === "dark" ? "bg-[#2C3639] text-white" : "bg-white"}`}>
            <SliderSection></SliderSection>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Home;
