import { Link } from "react-router-dom"

function HeroCreateCenter() {
  return (
    <section className="px-5 md:px-10 pt-[100px] brightness-100 bg-white/50 hero_appointment justify-between flex items-center h-[80vh] md:h-[75vh]">
        <div className="px-[10px] md:px-[50px] ">
            <h3>O'quv markazingizni qo'shing</h3>
            <p className="text-[#fff] mb-[20px] w-full md:max-w-[70%]">Bizga qo'shiling va talabalarga eng yaxshi o'quv imkoniyatlarini topishda yordam bering.</p>
            <h1 className="text-[#2d0e4e] text-[45px] font-[700] max-w-[500px] leading-[100%]">CEO Sahifasi</h1>
        </div>
        <div className="flex gap-[10px]">
            <Link to={'/'} className="text-[#fff] text-[22px] font-[300]">Bosh sahifa</Link>
            <Link to={'/create-centers'} className="text-[#2d0e4e] text-[22px] font-[500]">| Markaz yaratish</Link>
        </div>
    </section>
  )
}

export default HeroCreateCenter