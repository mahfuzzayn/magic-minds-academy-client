import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import InstructorsPage from "../../InstructorsPage/InstructorsPage";

const PopularInstructors = () => {
    return (
        <div className="popular-instructors mx-5 mt-[130px]">
            <SectionTitle heading="Popular Instructors"></SectionTitle>
            <div className="instructors-container container mx-auto">
                <InstructorsPage></InstructorsPage>
            </div>
        </div>
    );
};

export default PopularInstructors;
