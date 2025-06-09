import { ICategory, IResources } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5"

const API = import.meta.env.VITE_API

function HeaderResources() {
     const fetchFilterCategory = async () => {
        const res = await axios.get(`${API}/api/categories`);
        return res.data
    };

    const { data: courseCAtegory} = useQuery({
        queryKey: ["category"],
        queryFn: fetchFilterCategory,
    });

     const fetchResources = async () => {
        const res = await axios.get(`${API}/api/resources`);
        return res.data
    };

    const { data: resources} = useQuery({
        queryKey: ["resources"],
        queryFn: fetchResources,
    });
    console.log(courseCAtegory)
  return (
    <section className="py-[80px] px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto ">
            <form className="p-[10px] flex items-center gap-[15px] rounded-[6px] border-[1px] border-[#999]">
                <button type="submit" className="cursor-pointer">
                    <IoSearchOutline className="text-[20px]"/>
                </button>
                <input type="text" placeholder="Resurslar qidirish" className="w-[400px] lg:w-[600px] outline-none"/>
            </form>
            <h2 className="text-[22px] py-[20px]">Kategoriya bo‘yicha filtrlash</h2>
            <div className="flex flex-wrap gap-[20px]">
                <div className="w-[200px] rounded-[10px] overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-200">
                    <div className="h-[130px] flex items-center justify-center">
                        <IoSearchSharp className="text-[40px]"/>
                    </div>
                    <h2 className="py-[20px] text-center">Barcha Resurslar</h2>
                </div>
                <div className="w-[200px] rounded-[10px] overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-200">
                    <div className="h-[130px] flex items-center justify-center">
                        <FaStar className="text-[40px] text-[gold]"/>
                    </div>
                    <h2 className="py-[20px] text-center">Barcha Resurslar</h2>
                </div>
                {courseCAtegory?.data?.map((item: ICategory) => (
                    <div className="w-[200px] rounded-[10px] overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-200">
                        <div className="h-[130px]">
                            <img src={item.image} alt="" className="object-cover h-full " />
                        </div>
                        <h2 className="py-[20px] text-center">{item.name}</h2>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 justify-between md:grid-cols-3 gap-[40px]">
                {resources?.data?.map((item: IResources) => (
                    <div key={item.id} className="rounded-[15px] shadow-xl overflow-hidden cursor-pointer hover:scale-[103%] translate-all duration-200">
                        <div className="h-[200px]">
                            <img src={item.image}  className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="py-[20px] px-[15px]">
                            <h3 className="mb-[10px] text-[18px] font-[600]">{item.name}</h3>
                            <p className="text-[#888] text-[14px] mb-[10px]">by {item.user.firstName}</p>
                            <p className="text-[#888] text-[14px] mb-[10px]">{item.description}</p>
                            <div className="mb-[30px] flex gap-[10px] items-center justify-between">
                                <div></div>
                                <span className="text-[#888] text-[14px]">6/10/2025</span>
                            </div>
                            <div className="mb-[10px] flex gap-[10px] items-center justify-between">
                                <span className="text-[#451774] text-[14px]">Oldindan Ko'rish</span>
                                <button className="py-[6px] px-[20px] rounded-[20px] bg-[#451774] text-[#fff]">Yuklab olish</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default HeaderResources