import { CenterType } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPhone, FaStar } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoArrowBack, IoLocationOutline } from "react-icons/io5"
import { Link, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API

function CenterDetailsSection() {
    const {id} = useParams()
    const fetchStudyCenterDetails = async () => {
        const res = await axios.get(`${API}/api/centers/${id}`);
        return res.data
    };

    const { data: coursesDetailsData} = useQuery<CenterType>({
        queryKey: ["coursesDetailsQuery"],
        queryFn: fetchStudyCenterDetails,
    });
    console.log(coursesDetailsData)
  return (
    <section className="px-5 md:px-10 pt-[100px]">
        <Link to={'/'} className="flex gap-[7px]  items-center hover:text-[#451774] transition-all duration-200 cursor-pointer mb-[30px]">
            <IoArrowBack className="text-[25px]"/>
            <span className="text-[20px]">Markazlarga qaytish</span>
        </Link>
        <div className="flex gap-[40px] items-start">
            <div className="w-[60%]">
                <div className="w-full bg-[#c3a9a9] h-[500px] rounded-[20px] overflow-hidden mb-[30px]">
                    <img className="w-full object-cover h-full" src={`https://findcourse.net.uz/api/image/${coursesDetailsData?.data?.image}`} alt="center image" />
                </div>
                <div className="flex items-center justify-between mb-[20px]">
                    <h3 className="text-[30px] font-[700]">{coursesDetailsData?.data.name}</h3>
                    <div className="rounded-[30px] flex bg-[#F3E8FF] py-[3px] px-[10px] cursor-pointer gap-[3px] items-center">
                        <FaStar className="text-[20px] text-[#eab308]"/>
                        <span className="text-[18px] leading-[100%]">3</span>
                    </div>
                </div>
                <div className="flex items-center text-[#444] justify-start gap-[10px] mb-[20px]">
                    <IoLocationOutline className="text-[22px]"/>
                    <span className="text-[16px]">{coursesDetailsData?.data.address}</span>
                </div>
                <h4>Phone</h4>
                <div className="flex items-center text-[#111] justify-start gap-[10px] mb-[30px]">
                    <FaPhone  className="text-[22px]"/>
                    <span className="text-[20px]">{coursesDetailsData?.data.phone}</span>
                </div>
                <div className="flex items-center text-[#111] justify-start gap-[10px] mb-[10px]">
                    <FaRegMessage  className="text-[22px]"/>
                    <span className="text-[20px]">Sharhlar ({coursesDetailsData?.data.phone})</span>
                </div>
                <form>
                    <textarea name="comment" className="border-[1px] border-[#888] w-full rounded-[10px] outline-[#451774] p-[10px]"  id="comment"></textarea>
                    
                </form>

            </div>
            <div className="w-[40%]">

            </div>
        </div>
    </section>
  )
}

export default CenterDetailsSection