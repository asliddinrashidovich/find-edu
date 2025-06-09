import { FaQuoteLeft } from "react-icons/fa"

function AboutComponent() {
  return (
    <section id="abot_mainsection" className="px-5 md:px-10 py-[80px]">
        <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[50px] text-center font-[600] text-[#461773] mb-[4px]">Talabalarni muvaffaqiyatga tayyorlash</h2>
            <div className="max-w-[150px] mx-auto h-[4px] rounded-[3px] bg-[gold] mb-[70px]"></div>
            <div className="grid grid-cols-1  md:grid-cols-2 items-center gap-[30px] max-w-[900px] mx-auto">
                <div className="order-2">
                    <h3 className="text-[25px] font-[600] mb-[30px]">Ishonchli va muvaffaqiyatli o'quvchilarni shakllantirish</h3>
                    <p className="text-[16px] font-[400] text-[#999] mb-[30px]">Bizning platformamiz talabalarga qiziqishlari, byudjeti va hududiga mos keladigan ta'lim markazlarini topishda yordam beradi, eng yaxshi ta'lim tajribasini ta'minlaydi.</p>
                    <button className="text-[20px] mb-[30px] px-[40px] py-[10px] rounded-[30px] bg-[#461773] text-[#fff] outline-none">Ko'proq ko'rish</button>
                    <div className="shadow-2xl rounded-[15px] p-[15px] flex gap-[10px]">
                        <FaQuoteLeft className="text-[#461773]"/>
                        <i className="text-[18px] font-[300]">Ushbu platforma mening uchun mukammal o'quv markazini topishni osonlashtirdi. Juda tavsiya etaman!</i>
                    </div>
                </div>
                <div className="rounded-[20px] overflow-hidden shadow-xl order-0 md:order-2">
                    <img src="/about/students-DxjhFuxo.png" alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutComponent