import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./SliderSection.css";
import { Pagination } from "swiper";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const SliderSection = () => {
    const pagination = {
        clickable: true,
    };

    return (
        <div className="slider-section">
            <SectionTitle
                heading="Welcome to Magic Minds Academy"
                description="Where Imagination and Education Fuse, Creating Extraordinary Minds. Embark on an Enchanting Learning Journey at Magic Minds Academy - Ignite Your Curiosity, Unleash Your Potential."
                showGif={true}
            ></SectionTitle>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://i.ibb.co/JKsZPJq/slider-1.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/61frhkp/slider-2.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/SvN1HpM/slider-3.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/4fB5BK6/slider-4.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/p2QdTGR/slider-5.jpg" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SliderSection;
