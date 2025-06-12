import { CenterType } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { Rate } from "antd";
import axios from "axios";
import { FaPhone, FaStar } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoArrowBack, IoLocationOutline } from "react-icons/io5"
import { Link, useParams } from "react-router-dom";
import { IoIosCalendar } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { GrHomeOption } from "react-icons/gr";
import { MdOutlineWatchLater } from "react-icons/md";
import { format } from 'date-fns';

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
        <div className="flex flex-col lg:flex-row gap-[40px] items-start">
            <div className="w-full lg:w-[60%]">
                <div className="w-full bg-[#f3f3f3] h-[500px] rounded-[20px] overflow-hidden mb-[30px]">
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
                    <span className="text-[20px]">Sharhlar ({coursesDetailsData?.data?.comments.length})</span>
                </div>
                <form className="mb-[30px]">
                    <textarea placeholder="Bu markaz haqida fikringizni bildiring" name="comment" className="border-[1px] border-[#888] w-full rounded-[10px] outline-[#451774] p-[10px] mb-[10px]"  id="comment"></textarea>
                    <div className="flex items-center gap-[20px]">
                        <button className="bg-[#451774] p-[10px] rounded-[10px] text-[#fff]">
                            Sharh qodirish
                        </button>
                        <div className="flex items-center gap-[4px]">
                            <span className="text-[17px]">Reyting:</span>
                            <Rate defaultValue={5}/>
                        </div>
                    </div>
                </form>
                {coursesDetailsData?.data?.comments.map((item) => (
                    <div className="bg-[#f9fafb] rounded-[10px] mb-[10px] p-[10px]" key={item.id}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[20px]">
                                <div className="w-[20px] h-[20px] rounded-[50%]">
                                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQdztTDcpZ2pFqwWDYwSXbvZq5nzJYg5cn8w&s'} alt="user logo" />
                                </div>
                                <h3 className="font-[600]">{item.user.firstName} {item.user.lastName}</h3>
                                <Rate defaultValue={item.star} style={{ fontSize: 14 }} disabled/>
                            </div>
                            <div className="flex text-[#444] items-center gap-[10px]">
                                <IoIosCalendar />
                                <span>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</span>
                            </div>
                        </div>
                        <p className="mt-[5px] text-[#444]">{item.text}</p>
                    </div>
                ))}
            </div>
            <hr className="border-[1px] border-[#777] lg:hidden  w-full"/>
            <div className="w-full lg:w-[40%] mb-[80px]">
                <h3 className="text-[25px] text-[#111] font-[600] mb-[10px]">Bizning filiallar</h3>
                {coursesDetailsData?.data.filials.map((item) => (
                    <div className="bg-[#f3e8ff] border-[1px] border-[#e2c8fe] rounded-[10px] py-[20px] px-[10px]" key={item.id}> 
                        <h5 className="mb-[2px]">{item.name}</h5>
                        <p className="text-[#555] text-[15px]">{item.address}</p>
                    </div>
                ))}
                <div className="flex items-center text-[25px] text-[#111] font-[600] justify-start gap-[10px] mb-[20px] mt-[30px]">
                    <PiStudentBold className="text-[25px]"/>
                    <span className="text-[25px] text-[#111] font-[600]">Mavjud kurslar</span>
                </div>
                <button className="border-[2px] cursor-pointer border-[#451774] rounded-[10px] p-[7px] flex items-center gap-[7px] mb-[20px]">
                    <div className="w-[30px] h-[30px] rounded-[4px] bg-[#f3e8ff] flex items-center justify-center">
                        <GrHomeOption/>
                    </div>
                    <p>Optional</p>
                </button>
                <button className="bg-[#451774] flex items-center gap-[10px] cursor-pointer p-[10px] rounded-[10px] text-[#fff]">
                    <MdOutlineWatchLater  className="text-[20px] "/>
                    Darsga yozilish
                </button>
            </div>
        </div>
    </section>
  )
}

export default CenterDetailsSection