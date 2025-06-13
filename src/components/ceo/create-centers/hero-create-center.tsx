import { useEffect } from "react";
import * as AOS from "aos";
import "aos/dist/aos.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

function HeroCreateCenter() {
   useEffect(() => {
      AOS.init({
        duration: 1000,  
        once: true,  
      });
    }, [])
  return (
    <section className="hero_create_centers overflow-hidden relative justify-between flex items-center h-[100vh]">
        <div className="px-[10px] md:px-[50px] relative flex flex-col justify-center items-center w-full z-10">
            <h2 data-aos="fade-right" className="text-[#fff] text-[30px] sm:text-[50px] md:text-[75px] max-w-[1200px] mx-auto font-[700] text-center leading-[110%] mb-[50px]">{`Talabalarga eng yaxshi o'quv imkoniyatlarini topishda yordam bering.`}</h2>
            <Link to={'/'} data-aos="fade-left" className="py-[10px] md:py-[15px] px-[25px] md:px-[40px] rounded-[30px] bg-[#451774] text-[#fff] text-[20px] mb-[50px] cursor-pointer">O'quv Markazlar</Link>
        </div>
        <a href="#create_centers_mainsection" className="jumb_button absolute  bottom-[10px] z-10 left-[50%] translate-x-[-50%]">
          <MdOutlineKeyboardArrowDown className="text-[#fff] text-[70px] cursor-pointer "/>
        </a>
    </section>
  )
}

export default HeroCreateCenter


