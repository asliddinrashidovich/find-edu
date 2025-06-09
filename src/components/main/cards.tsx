import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5"
import axios from "axios";
import { MdLocalPhone } from "react-icons/md";
import { Iproduct } from "@/interfaces";
import { useState } from "react";

const API = import.meta.env.VITE_API

function Cards() {
    const [search, setSearch] = useState<string>("")

    const handleSearch = (value: string) => {
        setSearch(value)
    }
    const fetchStudyCenter = async () => {
        const res = await axios.get(`${API}/api/centers`);
        const allProducts =  res?.data?.data;
      
        const filtered = allProducts.filter((product: Iproduct) =>  product.name.toLowerCase().includes(search.toLowerCase()) );
        return filtered
    };

    const { data: coursesData} = useQuery({
        queryKey: ["coursesQuery", search],
        queryFn: fetchStudyCenter,
    });
    console.log(coursesData)
  return (
    <section className="py-[80px] px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto ">
            <div className="flex md:flex-row flex-col gap-[20px] justify-center mb-[40px]">
                <form className="p-[10px] flex items-center gap-[15px] border-[1px] border-[#451774] rounded-[50px]">
                    <button type="submit" className="cursor-pointer">
                        <IoSearchOutline className="text-[20px]"/>
                    </button>
                    <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Kasb, fan yoki o'quv markaz nomini kiriting" className="w-[400px] lg:w-[600px] outline-none"/>
                </form>
                <button className="text-[#fff] p-[10px] bg-[#451774] rounded-[10px] cursor-pointer">
                    Kurslar va Hududlar
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[70px]">
                {coursesData?.map((item: Iproduct) => (
                    <div key={item.id} className="rounded-[15px] shadow-xl overflow-hidden cursor-pointer hover:scale-[103%] translate-all duration-200">
                        <div className="h-[200px]">
                            <img src={item.image}  className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="py-[20px] px-[15px]">
                            <h3 className="mb-[10px] text-[18px] font-[600]">{item.name}</h3>
                            <p className="text-[#888] text-[14px] mb-[10px]">{item.address}</p>
                            <div className="mb-[10px] flex gap-[10px] items-center">
                                <MdLocalPhone className="text-[#888] "/>
                                <span className="text-[#888] text-[14px]">{item.phone}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Cards