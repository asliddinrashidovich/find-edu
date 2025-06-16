import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5"
import axios, { AxiosError } from "axios";
import { MdLocalPhone } from "react-icons/md";
import { Iproduct, likedProductType, UserType } from "@/interfaces";
import { useState } from "react";
import { FaRegHeart, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdHeart } from "react-icons/io";
import NoData from "../../no-data/no-data";
import CentersCardSkeleton from "../../skeleton/cards-skleton";
import { Modal } from "antd";
import { CiEdit } from "react-icons/ci";

const API = import.meta.env.VITE_API

function MyCentersData() {
    const [search, setSearch] = useState<string>("")
    const [liked, setLiked] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)
    const token = localStorage.getItem('token');
    const userDataRaw = localStorage.getItem('user');
    const user: UserType | null = userDataRaw ? JSON.parse(userDataRaw) : null;
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const navigate = useNavigate()

    const handleSearch = (value: string) => {setSearch(value)}

    // get centers
    const fetchStudyCenter = async () => {
        const res = await axios.get(`${API}/api/centers`, {
           headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const allProducts =  res?.data?.data;
        const filteredBySeoId = allProducts.filter((product: Iproduct) => product?.seoId == user?.id );
        const filtered = filteredBySeoId.filter((product: Iproduct) =>  product.name.toLowerCase().includes(search.toLowerCase()) );
        return filtered;
    };
    const { data: coursesData, isLoading: loading} = useQuery<Iproduct[]>({
        queryKey: ["coursesQuery", search, liked, refresh],
        queryFn: fetchStudyCenter,
    });

    // like item
    async function handleLike(centerId: number) {
        await axios.post(`${API}/api/liked`, {centerId}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            setLiked(prev => prev ? false : true)
        }).catch((err) => {
            if(err.status == 401) {
                toast.error('Please Login to like centers')
            } else {
                toast.error('Something went wrong')
            }
        })
    }

    // unlike item
    async function handleUnLike(likes: likedProductType[]) {
        const id = likes.find((filteredItem) => filteredItem.userId == user?.id)?.id
        await axios.delete(`${API}/api/liked/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            setLiked(prev => prev ? false : true)
        }).catch((err) => {
            if(err.status == 401) {
                toast.error('Please Login to like centers')
            } else {
                toast.error('Something went wrong')
            }
        })
    }

    // click to center details page
    function handleClick(id: number) {
        navigate(`/centers/${id}`)
    }

    // handle Delete
    async function handleDelete(deletedId: number) {
        try {
            await axios.delete(`${API}/api/centers/${deletedId}`, {headers: {Authorization: `Bearer ${token}`}})
            setRefresh(prev => prev ? false : true)
            toast.success('The Center Deleted')
        }
        catch (err) {
          const error = err as AxiosError<{ message: string }>;
          toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    function handleEdit(id: number) {
      navigate(`/my-centers/${id}`)
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
                {coursesData?.map((item: Iproduct) => (
                    <div key={item.id} className="rounded-[15px] shadow-xl overflow-hidden cursor-pointer hover:scale-[103%] translate-all duration-200 relative">
                        {!item.likes.some((itemIndex) => itemIndex.userId == user?.id) && <button onClick={() => handleLike(item.id)} className="w-[30px] h-[30px] bg-[#dce4ef] rounded-[50%] absolute top-[10px] right-[10px] flex items-center cursor-pointer justify-center hover:scale-[105%] transition-all duration-100 hover:bg-[#999]">
                            <FaRegHeart className="text-[#ef4444]"/>
                        </button>}
                        {item.likes.some((itemIndex) => itemIndex.userId == user?.id) && <button onClick={() => handleUnLike(item.likes)} className="w-[30px] h-[30px] bg-[#dce4ef] rounded-[50%] absolute top-[10px] right-[10px] flex items-center cursor-pointer justify-center hover:scale-[105%] transition-all duration-100 hover:bg-[#999]">
                            {<IoMdHeart className="text-[#ef4444]"/>}
                        </button>}

                        <button onClick={() => handleEdit(item.id)} className="w-[30px] h-[30px] bg-[#dce4ef] rounded-[50%] absolute top-[50px] right-[10px] flex items-center cursor-pointer justify-center hover:scale-[105%] transition-all duration-100 hover:bg-[#999]">
                            <CiEdit className="text-[#ef8644]"/>
                        </button>
                        <button onClick={() => setDeleteId(item.id)} className="w-[30px] h-[30px] bg-[#dce4ef] rounded-[50%] absolute top-[90px] right-[10px] flex items-center cursor-pointer justify-center hover:scale-[105%] transition-all duration-100 hover:bg-[#999]">
                            <FaRegTrashAlt className="text-[#ef4444]"/>
                        </button>
                        <Modal
                            title="Centerni o‘chirish"
                            open={deleteId === item.id}
                            onOk={() => handleDelete(item.id)}
                            onCancel={() => setDeleteId(null)}
                        >
                            <p>Haqiqatdan ham shu centerni o'chirishni istaysizmi</p>
                        </Modal>
                        
                        <div onClick={() => handleClick(item.id)}>
                            <div className="h-[300px] md:h-[200px]">
                                <img src={`https://findcourse.net.uz/api/image/${item.image}`}  className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="py-[20px] px-[15px]">
                                <div className="flex items-center justify-between">
                                    <h3 className="mb-[10px] text-[18px] font-[600]">{item.name}</h3>
                                    <div className="flex items-center gap-[5px]">
                                        <FaStar className="text-[#eab308]" />
                                        {item.comments.length ? (item.comments.reduce((star1, star2) => star1 + star2.star, 0) / item.comments.length).toFixed(1) : '0.0'}
                                    </div>
                                </div>
                                <p className="text-[#888] text-[14px] mb-[10px]">{item.address}</p>
                                <div className="mb-[10px] flex gap-[10px] items-center">
                                    <MdLocalPhone className="text-[#888] "/>
                                    <span className="text-[#888] text-[14px]">{item.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {!loading && Array.isArray(coursesData) && !coursesData.length && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 ">
                        <NoData>Malumotlar topilmadi</NoData>
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

export default MyCentersData