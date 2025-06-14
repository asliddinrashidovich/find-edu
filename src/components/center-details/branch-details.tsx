import { filalType } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { Image, Skeleton } from "antd";
import axios from "axios";
import { IoArrowBack, IoLocationOutline } from "react-icons/io5";
import { PiCity } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API

interface branchInterface {
    data: filalType
}

function BranchDetails() {
    const navigate = useNavigate()
    const {id} = useParams()
    const prevCenterJson = localStorage.getItem('prevCenter')
    const prevCenter: number | null = prevCenterJson ? JSON.parse(prevCenterJson) : null;

    // get center details
    const fetchBranchDetails = async () => {
        const res = await axios.get(`${API}/api/filials/${id}`);
        return res.data
    };
    const { data: branchDetailsData, isLoading: loading} = useQuery<branchInterface>({
        queryKey: ["branchdetails"],
        queryFn: fetchBranchDetails,
    });
    console.log(branchDetailsData)
  return (
    <section className="px-5 md:px-10 pt-[100px]">
        <button onClick={() => navigate(`/centers/${prevCenter}`)} className="flex gap-[7px]  items-center hover:text-[#451774] transition-all duration-200 cursor-pointer mb-[30px]">
            <IoArrowBack className="text-[25px]"/>
            <span className="text-[20px]">Markazga qaytish</span>
        </button>
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 rounded-[20px] md:grid-cols-2 shadow-2xl mb-[70px]">
            <div className="bg-[#f3f3f3] h-[500px] rounded-[20px] overflow-hidden ">
                <Image width={'100%'} height={'100%'} className="w-full object-cover h-full" src={`https://findcourse.net.uz/api/image/${branchDetailsData?.data?.image}`} alt="center image" />
            </div>
            {!loading && <div className="p-[30px]">
                <h3 className="text-[30px] font-[700] mb-[20px]">{branchDetailsData?.data.name}</h3>
                <div className="flex items-center gap-[10px] mb-[15px]">
                    <PiCity className="text-[#9734fa] text-[20px]"/>
                    <h3 className="text-[17px] text-[#555]">{branchDetailsData?.data.region.name}</h3>
                </div>
                <div className="flex items-center gap-[10px] mb-[15px]">
                    <IoLocationOutline className="text-[#9734fa] text-[20px]"/>
                    <div>
                        <h4 className="text-[18px] font-[600]">Manzil</h4>
                        <h3 className="text-[17px] text-[#555]">{branchDetailsData?.data.address}</h3>
                    </div>
                </div>
                <div className="flex items-center gap-[10px] mb-[15px]">
                    <IoLocationOutline className="text-[#9734fa] text-[20px]"/>
                    <div>
                        <h4 className="text-[18px] font-[600]">Telefon</h4>
                        <a href={`tel:${branchDetailsData?.data.phone}`} className="text-[17px] text-[#9734fa] hover:underline">{branchDetailsData?.data.phone}</a>
                    </div>
                </div>
            </div>}
            {loading && (
                <div className="p-[30px]">
                    <Skeleton paragraph={{rows: 5}} />
                </div>
            )}
        </div>
    </section>
  )
}

export default BranchDetails