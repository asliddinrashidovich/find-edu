import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function AboutHeader() {
  return (
    <section className="hero_about overflow-hidden relative justify-between flex items-center h-[100vh]">
        <div className="px-[10px] md:px-[50px] relative flex flex-col justify-center items-center w-full z-10">
            <h2 className="text-[#fff] text-[30px] sm:text-[50px] md:text-[75px] max-w-[1200px] mx-auto font-[700] text-center leading-[110%] mb-[50px]">Eng yaxshi ta'lim markazlarini topishda yordam beramiz!</h2>
            <button className="py-[10px] md:py-[15px] px-[25px] md:px-[40px] rounded-[30px] bg-[#451774] text-[#fff] text-[20px] mb-[50px] cursor-pointer">O'quv Markazlar</button>
        </div>
        <a href="#abot_mainsection" className="jumb_button absolute  bottom-[10px] z-10 left-[50%] translate-x-[-50%]">
          <MdOutlineKeyboardArrowDown className="text-[#fff] text-[70px] cursor-pointer "/>
        </a>
    </section>
  )
}

export default AboutHeader