import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './Banner.css';

// import required modules
import { Autoplay, Pagination, Navigation, FreeMode, Thumbs } from 'swiper/modules';

const Banner = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className='w-[60%] mx-auto space-y-4'>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Autoplay, Pagination, Navigation, FreeMode, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide><img src="./assets/home/01.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/02.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/03.png" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/04.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/05.png" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/06.png" alt="" /></SwiperSlide>
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide><img src="./assets/home/01.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/02.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/03.png" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/04.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/05.png" alt="" /></SwiperSlide>
                <SwiperSlide><img src="./assets/home/06.png" alt="" /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;