import { useEffect } from "react";
import * as AOS from "aos";
import "aos/dist/aos.css";

function AboutMission() {
    useEffect(() => {
        AOS.init({
            duration: 1000,  
            once: true,  
        });
    }, []);
  return (
    <section id="abot_mainsection" className="px-5 md:px-10 py-[80px]">
        <div className="max-w-[1200px] mx-auto">
            <h2 data-aos="fade-up" className="text-[50px] text-center font-[600] text-[#461773] mb-[4px]">Bizning missiyamiz</h2>
            <div  data-aos="fade-up" className="max-w-[150px] mx-auto h-[4px] rounded-[3px] bg-[gold] mb-[70px]"></div>
            <div className="grid grid-cols-1  md:grid-cols-2 items-center gap-[30px] max-w-[900px] mx-auto">
                <div  data-aos="fade-right" className="order-2">
                    <h3 className="text-[25px] font-[600] mb-[30px]">Yorqin kelajak uchun o'quvchilarni kuchaytirish</h3>
                    <p className="text-[16px] font-[400] text-[#999] mb-[30px]">Biz talabalar va sifatli ta'lim o'rtasidagi tafovutni bartaraf etishni maqsad qilganmiz, o'quvchilarni eng yaxshi ta'lim muassasalari bilan bog'laydigan qulay platformani taqdim etish orqali. Har bir talaba muvaffaqiyatga olib boradigan shaxsiylashtirilgan ta'lim tajribasiga ega bo'lishini ta'minlash bizning maqsadimizdir.</p>
                    <button className="text-[20px] mb-[30px] px-[40px] py-[10px] rounded-[30px] bg-[#461773] text-[#fff] outline-none">Ro'yxatdan o'tish</button>
                </div>
                <div  data-aos="fade-left" className="rounded-[20px] overflow-hidden shadow-xl h-[500px] order-0 md:order-2">
                    <img src="/about/pexels-tamhoang139-1007066.jpg" alt="asd"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutMission
