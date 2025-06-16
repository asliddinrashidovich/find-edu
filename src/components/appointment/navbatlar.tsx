import { useQuery } from "@tanstack/react-query";
import { IoCalendarOutline, IoSearchOutline } from "react-icons/io5"
import axios from "axios";
import { reseption } from "@/interfaces";
import { useState } from "react";
import NoData from "../no-data/no-data";
import CentersCardSkeleton from "../skeleton/cards-skleton";
import { MdLocationPin } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { Modal } from "antd";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API

function NavbatlarCards() {
    const [search, setSearch] = useState<string>("")
    const [refresh, setRefresh] = useState<boolean>(false)
    const token = localStorage.getItem('token');
    const [deleteId, setDeletedId] = useState<number | null>(null)
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSearch = (value: string) => {setSearch(value)}
    
    const fetchMydataReseptions = async () => {
        const res = await axios.get(`${API}/api/users/mydata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const allProducts =  res?.data?.data?.receptions
        const filtered = allProducts.filter((product: reseption) =>  product?.center?.name.toLowerCase().includes(search.toLowerCase()));
        return filtered;
    };
      
    const { data: myDataReceptions, isLoading: loading} = useQuery<reseption[]>({
        queryKey: ["mydataReceptions", refresh, search],
        queryFn: fetchMydataReseptions,
    });

    // delete item
    async function handleDelete(itemId: number) {
        setIsDeleting(true)
        await axios.delete(`${API}/api/reseption/${itemId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            toast.success("The appointment deleted")
            setRefresh(prev => prev ? false : true)
            setDeletedId(null)
        }).catch((err) => {
            if(err.status == 401) {
                toast.error('Please Login to like centers')
            } else {
                toast.error('Something went wrong')
            }
        }).finally(() => {
            setIsDeleting(false)
        })
    }
    return (
    <section id="study_centers" className="py-[80px] px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto ">
            <div className="flex md:flex-row flex-col gap-[20px] justify-center mb-[40px]">
                <form className="p-[10px] flex items-center gap-[15px] border-[1px] border-[#451774] rounded-[50px]">
                    <button type="submit" className="cursor-pointer">
                        <IoSearchOutline className="text-[20px]"/>
                    </button>
                    <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Kasb, fan yoki o'quv markaz nomini kiriting" className="w-[400px] lg:w-[600px] outline-none"/>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[70px]">
                {myDataReceptions?.map((item) => (
                    <div key={item.id} className="rounded-[15px] shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer  translate-all duration-200 relative">
                        <div className="bg-[#faf5ff]">
                            <div className="h-[300px] md:h-[200px]">
                                <img src={item.filial?.image ? `https://findcourse.net.uz/api/image/${item.filial.image}` : "default.jpg"}  className="w-full h-full object-cover" alt="filial" />
                            </div>
                            <div className="py-[20px] px-[15px]">
                                <h3 className="text-[25px] text-[#451774] font-[600] mb-[10px]">{item.center.name}</h3>
                                <div className="flex gap-[7px] items-center">
                                    <MdLocationPin className="shrink-0 text-[#451774]"/>   
                                    <span className="font-[700]">Manzil</span>
                                    <span className="text-[14px] text-[#777]">{item.center.address}, Toshkent</span>
                                </div>
                                <div className="flex gap-[7px] items-center">
                                    <IoCalendarOutline className="shrink-0 text-[#451774]"/>   
                                    <span className="font-[700]">Tashrif sanasi</span>
                                    <span className="text-[14px] text-[#777]">{item?.visitDate.slice(0, 10)} at {item?.visitDate.slice(11, 16)}</span>
                                </div>
                                <div className="flex gap-[7px] items-center">
                                    <HiInformationCircle className="shrink-0 text-[#451774]"/>   
                                    <span className="text-[14px] font-[600] text-[#f0a400]">{item.status}</span>
                                </div>
                                <div className="flex items-center justify-end mt-[10px]">
                                    <div onClick={() => setDeletedId(item.id)} className="flex items-center text-[#ff3300] gap-[6px]">
                                        <FaTrashAlt />
                                        <span>O'chirish</span>
                                    </div>
                                </div>
                                <Modal
                                    title="O'chirishni tasdiqlash"
                                    closable={{ 'aria-label': 'Custom Close Button' }}
                                    open={deleteId === item.id}
                                    onOk={() => handleDelete(item.id)}
                                    onCancel={() => setDeletedId(null)}
                                    okText={isDeleting ? "O'chirilmoqda" : "Ok"}
                                    okButtonProps={{ disabled: isDeleting }}
                                >
                                    <p>Ushbu uchrashuvni o'chirishni xohlaysizmi?</p>
                                </Modal>
                            </div>
                        </div>
                    </div>
                ))}
                {!loading && Array.isArray(myDataReceptions) && !myDataReceptions.length && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 ">
                        <NoData>Sizda hali uchrashuvlar yo'q</NoData>
                    </div>
                )}
                {loading && ( 
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 ">
                        <CentersCardSkeleton/>
                    </div>
                )}
            </div>
        </div>
    </section>
  )
}

export default NavbatlarCards