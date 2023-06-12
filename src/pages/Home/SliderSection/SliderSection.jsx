import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./SliderSection.css";
import { Pagination } from "swiper";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SliderSection = () => {
    const { data: sliderData = [] } = useQuery({
        queryKey: ["slider-data"],
        queryFn: async () => {
            const res = await axios.get(
                "https://magic-minds-academy-server.vercel.app/slider-data"
            );
            return res.data;
        },
    });
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
                className="mySwiper max-h-[768px] relative"
            >
                {sliderData.map((slide) => (
                    <SwiperSlide key={slide?._id} className="max-h-[768px]">
                        <div className="relative">
                            <div className="overlay absolute bg-gray-900 h-full w-full opacity-40 z-1000"></div>
                            <div className="w-full max-w-[768px] text-information absolute top-1/2 transform -translate-y-1/2 mx-auto z-100 px-10 space-y-4">
                                <h2 className="text-left text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold">
                                    {slide?.header}
                                </h2>
                                <p className="hidden sm:block text-left text-white">
                                    {slide?.description}
                                </p>
                            </div>
                            <div className="picture">
                                <img src={slide?.image} alt="" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderSection;
