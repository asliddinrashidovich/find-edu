import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import type { Swiper as SwiperClass } from 'swiper/types';
import { getSlides } from '@/data/data';
import { AuroraText } from '../magicui/aurora-text';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const {t} = useTranslation()
  const Slides = getSlides(t)

  const onAutoplayTimeLeft = (
    _swiper: SwiperClass,
    time: number,
    progress: number
  ) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };


  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper main__slider h-[100vh]"
      >
        {Slides.map((item, i) => (
          <SwiperSlide key={i}>
            <div className='relative h-full max-w-[1000px] w-full flex items-center'>
              <div className='absolute z-2 w-[100vw] main__slider'>
                <img src={item.img} className='w-[100vw]  h-[100vh] object-cover' alt="" />
              </div>
              <div className='absolute z-5 px-[50px] md:px-[100px]'>
                <h1 className="text-[#fff] leading-[100%] text-[30px] md:text-[60px] font-[700] mb-[20px] font-['Open_Sans']"><AuroraText>{item.text}</AuroraText> </h1>
                <p className='text-[#999]'>{item.paragraph}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
