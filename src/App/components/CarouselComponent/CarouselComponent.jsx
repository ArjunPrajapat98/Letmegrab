import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import firstImage from '../../../images/Coffee.jpg';
import secondImage from '../../../images/Coffee 1.jpg';
import thirdImage from '../../../images/Coffee 2.webp';
import fourthImage from '../../../images/Coffee 3.jpg';
import fifthImage from '../../../images/Coffee 4.jpg';
import sixthImage from '../../../images/Coffee 4.webp';

const Banner = () => {
  let data = [firstImage, secondImage, thirdImage, fourthImage, fifthImage, sixthImage];

  return (
    <div className='home-banner'>
      <Swiper
        loop={true}
        allowSlidePrev={true}
        allowSlideNext={true}
        modules={[Navigation]}
        navigation
        slidesPerView={1}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item}
              alt={`Slide ${index + 1}`}
              style={{ height: '750px', cursor: 'pointer', width: '100%' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
