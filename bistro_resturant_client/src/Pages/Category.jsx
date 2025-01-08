import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import SectionTitle from '../components/SectionTitle';

export default function App() {
    return (
        <div className='my-10'>
            <SectionTitle heading='Order Online' subHeading='---From 11:00am to 10:00pm---'></SectionTitle>
            <section>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src="./assets/home/slide1.jpg" alt="" />
                        <h2 className='text-4xl text-center uppercase relative -top-16 text-white'>Salads</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./assets/home/slide2.jpg" alt="" />
                        <h2 className='text-4xl text-center uppercase relative -top-16 text-white'>Salads</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./assets/home/slide3.jpg" alt="" />
                        <h2 className='text-4xl text-center uppercase relative -top-16 text-white'>Salads</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./assets/home/slide4.jpg" alt="" />
                        <h2 className='text-4xl text-center uppercase relative -top-16 text-white'>Salads</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./assets/home/slide5.jpg" alt="" />
                        <h2 className='text-4xl text-center uppercase relative -top-16 text-white'>Salads</h2>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./assets/home/slide3.jpg" alt="" />
                        <h2 className='text-4xl text-center uppercase relative -top-16 text-white'>Salads</h2>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
}
