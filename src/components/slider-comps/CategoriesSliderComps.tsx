"use client";
import React from "react";
import { Categories } from "@/app/types/category.model";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Grid, Pagination , Navigation } from "swiper/modules";
import Image from "next/image";

export default function CategoriesSliderComps({
  category,
}: {
  category: Categories[];
}) {
  return (
    <div className="my-8">
    <h2 className="text-center text-3xl font-bold underline underline-offset-2"><span className="text-red-500 text-5xl">O</span>ur Categories</h2>
      <div className="px-5 mt-5 w-[80%] mx-auto">
        <Swiper
          slidesPerView={2}
          grid={{
            rows: 2,
            fill: "row",
          }}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
    640: {
      slidesPerView: 3,
      grid: { rows: 2 },
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5,
      grid: { rows: 2 },
      spaceBetween: 30,
    },
  }}
          navigation={true}
          modules={[Grid, Pagination , Navigation]}
          className="mySwiper "
        >
          {category.map((cat) => (
            <>
              <SwiperSlide key={cat._id}>
                <div className="relative rounded-full h-[150px] mx-auto border-2 border-black">
                  <Image
                    src={cat.image}
                    fill
                    priority
                    loading="eager"
                    sizes="(max-width:768px) 100vw (max-width:1200px) 50vw , 25vw"
                    alt="image slider"
                    className=" object-cover rounded-full"
                  />
                </div>
                <p className="text-2xl text-center">{cat.name}</p>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
