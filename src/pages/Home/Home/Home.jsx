import React from "react";
import useTitle from "../../../hooks/useTitle";
import SliderSection from "../SliderSection/SliderSection";

const Home = () => {
    useTitle();
    
    return <div className="home">
        <SliderSection></SliderSection>
    </div>;
};

export default Home;
