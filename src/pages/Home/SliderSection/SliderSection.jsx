import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./SliderSection.css";
import { Pagination } from "swiper";

const SliderSection = () => {
    const pagination = {
        clickable: true,
    };

    return (
        <div className="slider-section">
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
