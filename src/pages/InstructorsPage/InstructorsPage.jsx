import React from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useInstructorsData from "../../hooks/useInstructorsData";

const InstructorsPage = () => {
    const [instructors] = useInstructorsData();

    return (
        <div className="instructors">
            <SectionTitle heading="Instructors"></SectionTitle>
            <div className="box mx-5">
                <div className="persons-container max-w-[1080px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor?._id}
                            className="card border-2 p-4 shadow-sm rounded-lg"
                        >
                            <div className="card-header">
                                <div className="card-image h-[250px] overflow-hidden rounded-lg mb-6">
                                    <img
                                        src={instructor?.photoURL}
                                        className="w-full object-cover rounded-lg"
                                        alt=""
                                    />
                                </div>
                                <h3 className="text-xl font-bold">
                                    {instructor?.name}
                                </h3>
                                <p className="font-semibold mt-2">
                                    Email:{" "}
                                    <span className="font-normal">
                                        {instructor?.email}
                                    </span>
                                </p>
                                {!!instructor?.classes?.length && (
                                    <p className="font-semibold mt-2">
                                        Total Classes:{" "}
                                        <span className="font-normal">
                                            {instructor?.classes?.length}
                                        </span>
                                    </p>
                                )}
                                {!!instructor?.classes?.length && (
                                    <div className="classes-container mt-2">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Classes
                                        </h3>
                                        <hr />
                                        <ul className="ml-5 mt-2">
                                            {instructor?.classes.map(
                                                (currentClass) => (
                                                    <li
                                                        key={currentClass?._id}
                                                        className="list-disc"
                                                    >
                                                        {currentClass?.name}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstructorsPage;
