// import { Link } from "react-router-dom"

// function HeroCreateCenter() {
//   return (
//     <section className="px-5 md:px-10 pt-[100px] brightness-100 bg-white/50 hero_appointment justify-between flex items-center h-[80vh] md:h-[75vh]">
//         <div className="px-[10px] md:px-[50px] ">
//             <h3>O'quv markazingizni qo'shing</h3>
//             <p className="text-[#fff] mb-[20px] w-full md:max-w-[70%]">Bizga qo'shiling va talabalarga eng yaxshi o'quv imkoniyatlarini topishda yordam bering.</p>
//             <h1 className="text-[#2d0e4e] text-[45px] font-[700] max-w-[500px] leading-[100%]">CEO Sahifasi</h1>
//         </div>
//         <div className="flex gap-[10px]">
//             <Link to={'/'} className="text-[#fff] text-[22px] font-[300]">Bosh sahifa</Link>
//             <Link to={'/create-centers'} className="text-[#2d0e4e] text-[22px] font-[500]">| Markaz yaratish</Link>
//         </div>
//     </section>
//   )
// }

// export default HeroCreateCenter

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


