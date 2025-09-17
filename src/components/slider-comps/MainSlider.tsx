"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

export default function MainSlider() {
  return (
    <div className="px-5 mt-4 w-[95%] lg:w-[65%] mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2900,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-[300px] mx-auto">
            <Image
              src="/slider/slide1.jpg"
              fill
              priority
              loading="eager"
              sizes="(max-width:768px) 100vw (max-width:1200px) 50vw , 25vw"
              alt="image slider"
              className="object-cover"
            />
            <div className="absolute top-[5px] left-[5px] lg:top-[50px] lg:left-[100px] p-3">
              <p className="text-lg lg:text-3xl font-bold">EAT HEALTHY </p>
              <p className="text-lg lg:text-3xl font-bold text-red-500">STAY HEALTHY</p>
              <Button className="my-5 cursor-pointer px-10 py-3">
               <Link href="/products">Shop Now</Link> 
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[300px] mx-auto">
            <Image
              src="/slider/slide2.jpg"
              alt="electroslider"
              fill
              priority
              loading="eager"
              sizes="(max-width:768px) 100vw (max-width:1200px) 50vw"
              className="object-cover"
            />
            <div className="absolute top-[5px] left-[5px] lg:top-[50px] lg:left-[100px] p-3">
              <h2 className="text-lg lg:text-3xl font-bold">Women Collection</h2>
              <p className="text-lg lg:text-2xl text-red-500 font-bold">Be Unique </p>
              <p className="text-lg lg:text-2xl text-red-500 font-bold">Be Amazing</p>
              <Button className="my-5 cursor-pointer px-10 py-3">
                <Link href="/products">Shop Now</Link>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[300px] mx-auto">
            <Image
              src="/slider/electronics.jpg"
              alt="electroslider"
              fill
              priority
              loading="eager"
              sizes="(max-width:768px) 100vw (max-width:1200px) 50vw"
              className="object-cover"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[300px] mx-auto">
            <Image
              src="/slider/menfashion.jpg"
              alt="electroslider"
              fill
              priority
              loading="eager"
              sizes="(max-width:768px) 100vw (max-width:1200px) 50vw"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
