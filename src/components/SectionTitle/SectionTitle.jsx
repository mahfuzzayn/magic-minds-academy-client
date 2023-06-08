import React from "react";

const SectionTitle = ({ heading, description, showGif }) => {
    return (
        <div className="section-title text-center mt-[130px] mb-10 mx-5">
            <div className="max-w-[768px] mx-auto">
                {showGif && (
                    <div className="gif max-w-[500px] ml-auto mt-4">
                        <img
                            src="https://gifimgs.com/animations/creatures-cartoons/wizards/Green_wizard.gif"
                            alt=""
                            className="w-full max-w-[200px] ml-auto"
                        />
                    </div>
                )}
                <h1 className="text-4xl font-bold">{heading}</h1>
                <h3 className="mt-4 font-medium">{description}</h3>
            </div>
        </div>
    );
};

export default SectionTitle;
