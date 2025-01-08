import React, { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import ReactStars from "react-rating-stars-component";

const Testimonials = () => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    const ratings = {
        size: 30,
        edit: false
    };

    return (
        <div className='mb-20'>
            <SectionTitle heading='TESTIMONIALS' subHeading='---What Our Clients Say---'></SectionTitle>

            {/* <h1 className='text-center text-3xl'> Length {reviews.length}</h1> */}

            <section>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className='text-center space-y-4'>
                                <div className='flex justify-center'>
                                    <ReactStars {...ratings} value={review.rating} />
                                </div>
                                <div className='flex justify-center'>
                                    <img src="./assets/home/Group.png" alt="" />
                                </div>
                                <p className='w-[80%] mx-auto'>{review.details}</p>
                                <h3 className='text-3xl text-btn_gold'>{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </section>
        </div>
    );
};

export default Testimonials;