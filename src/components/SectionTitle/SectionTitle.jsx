import React from "react";

const SectionTitle = ({ heading, description }) => {
    return (
        <div className="section-title text-center mt-[130px] mb-10 mx-5">
            <div className="max-w-[768px] mx-auto">
                <h1 className="text-4xl font-bold">{heading}</h1>
                <h3 className="mt-4 font-medium">{description}</h3>
                <div className="max-w-[500px] mx-auto mt-4">
                    <img
                        src="https://gifimgs.com/animations/creatures-cartoons/wizards/Green_wizard.gif"
                        alt=""
                        className="w-full max-w-[200px] ml-auto"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1300 132"
                        fill="#ef4444"
                    >
                        <path d="M1282.46 5.79c-.91-3.88-5.18-6.65-9.04-5.54-104.37 29.02-193.78 56.87-361.6 74.53-268.41 28.16-539.6 14.6-803.08-26.38C94.9 47.97-.34 26.24.08 41.38c-1.56 14.21 19.47 12.91 29.6 17.24 32.82 8.6 66.1 15.33 99.4 21.81 238.99 44.43 482.98 55.29 725.63 49.01 92.37-4.11 185.68-9.96 275.51-33.09 18.68-6.31 42.79-9.21 55.18-25.89 6.76-13.28-12.41-21.16-13.83-6.12-17.69 11.67-39.31 15.61-59.45 21.34-114.56 25.18-245.31 30.46-361.99 30.36-191.39.45-383.13-10.13-572-42.21 277.31 36.42 560.77 44.96 837.82 2.23 104.21-15.4 195.11-42.74 260.97-61.22a7.57 7.57 0 0 0 5.54-9.05Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SectionTitle;