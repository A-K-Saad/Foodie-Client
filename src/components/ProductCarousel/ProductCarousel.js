import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { NavLink } from "react-router-dom";
SwiperCore.use([Pagination, Autoplay]);

const ProductCarousel = ({ products, header }) => {
  return (
    <>
      <div className="my-10 px-2 md:px-14 lg:px-32">
        <h1 className="text-3xl font-bold text-center">{header}</h1>
        <div className="underline my-4"></div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          className="mySwiper"
        >
          {products?.map((product) => {
            return (
              <SwiperSlide
                key={product._id}
                className="flex-col rounded-lg bg-white text-center"
              >
                <NavLink to={`/products/${product._id}`}>
                  <div className="w-full h-60 overflow-hidden p-2">
                    <img
                      src={product.photo}
                      alt="Product"
                      className="rounded-t-lg m-auto max-w-full h-full"
                    />
                  </div>
                  <div className="pb-8 px-2">
                    <h1 className="text-xl">{product.name}</h1>
                    <h1 className="text-blue-400 pb-3">${product.price}</h1>
                  </div>
                </NavLink>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default ProductCarousel;
