import { useEffect } from "react";
import * as AOS from "aos";
import "aos/dist/aos.css";

function AboutInstuction() {
    useEffect(() => {
        AOS.init({
            duration: 1000,  
            once: true,  
        });
    }, []);
  return (
    <section id="abot_mainsection" className="px-5 md:px-10 pb-[80px]">
        <div className="max-w-[1200px] mx-auto">
            <h2 data-aos="fade-up" className="text-[50px] text-center font-[600] text-[#461773] mb-[4px]">Bizning ko'rsatkichimiz</h2>
            <div data-aos="fade-up" className="max-w-[150px] mx-auto h-[4px] rounded-[3px] bg-[gold] mb-[70px]"></div>
            <div className="grid grid-cols-1  md:grid-cols-2 items-center gap-[50px] max-w-[900px] mx-auto">
                <div data-aos="fade-left" className="order-2">
                    <h3 className="text-[25px] font-[600] mb-[30px]">Ta'lim kelajagini shakllantirish</h3>
                    <p className="text-[16px] font-[400] text-[#999] mb-[30px]">Bizning ko'rsatkichimiz dunyoning yetakchi ta'lim platformasiga aylanish bo'lib, har bir talaba o'zining akademik faoliyatida yaxshi natijalarga erishish uchun kerakli o'quv resurslari, muassasalar va yo'riqnomalarni topishini ta'minlashdir.</p>
                    <button className="text-[20px] mb-[30px] px-[40px] py-[10px] rounded-[30px] bg-[#461773] text-[#fff] outline-none">Ro'yxatdan o'tish</button>
                </div>
                <div data-aos="fade-right" className="rounded-[20px] overflow-hidden shadow-xl  order-0 ">
                    <img src="/about/about1-DCCkClCs.png" alt="asd"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutInstuction