import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5"
import axios from "axios";
import { MdLocalPhone } from "react-icons/md";
import { Iproduct, likedProductType, MydataType2, UserType } from "@/interfaces";
import { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdHeart } from "react-icons/io";
import NoData from "../no-data/no-data";
import CentersCardSkeleton from "../skeleton/cards-skleton";

const API = import.meta.env.VITE_API

function NavbatlarCards() {
    const [search, setSearch] = useState<string>("")
    const [liked, setLiked] = useState<boolean>(false)
    const [branchList, setBranchList] = useState<string[]>([])
    const [centerlocationList, setCenterlocationList] = useState<string[]>([])
    const token = localStorage.getItem('token');
    const userDataRaw = localStorage.getItem('user');
    const user: UserType | null = userDataRaw ? JSON.parse(userDataRaw) : null;

    const navigate = useNavigate()

    const handleSearch = (value: string) => {setSearch(value)}

    
    const fetchMydataReseptions = async () => {
        const res = await axios.get(`${API}/api/users/mydata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
    };
      
      const { data: myDataReceptions} = useQuery<MydataType2>({
          queryKey: ["mydataReceptions"],
          queryFn: fetchMydataReseptions,
      });
      console.log(myDataReceptions)
    // get centers
    const fetchStudyCenter = async () => {
        const res = await axios.get(`${API}/api/centers`);
        const allProducts =  res?.data?.data;
        const filtered = allProducts.filter((product: Iproduct) =>  product.name.toLowerCase().includes(search.toLowerCase()) );
        return filtered;
    };
    const { data: coursesData, isLoading: loading} = useQuery<Iproduct[]>({
        queryKey: ["coursesQuery", search, liked],
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

    // add remove filter items
    function handleRemoveBranch(item: string) {
        setBranchList(prev => prev.filter(prevItem => prevItem != item))
    }
    function handleRemoveLocation(item: string) {
        setCenterlocationList(prev => prev.filter(prevItem => prevItem != item))
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
            <div className="w-full flex justify-center gap-[10px] items-center mb-[30px]">
                {branchList.map((item, i) => (
                    <div key={i} className="flex flex-wrap bg-[#dbeafe] py-[5px] px-[10px] items-center gap-[10px] rounded-[10px]">
                        <span>{item}</span>
                        <button onClick={() => handleRemoveBranch(item)} className="text-[10px] cursor-pointer">✕</button>
                    </div>
                ))}
                {centerlocationList.map((item, i) => (
                    <div key={i} className="flex flex-wrap bg-[#f3e8ff] py-[5px] px-[10px] items-center gap-[10px] rounded-[10px]">
                        <span>{item}</span>
                        <button onClick={() => handleRemoveLocation(item)} className="text-[10px] cursor-pointer">✕</button>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[70px]">
                {myDataReceptions?.data.receptions.map((item) => (
                    <div key={item.id} className="rounded-[15px] shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer  translate-all duration-200 relative">
                        <div onClick={() => handleClick(item.id)}>
                            <div className="h-[300px] md:h-[200px]">
                                <img src={`https://findcourse.net.uz/api/image/${item.filial.image}`}  className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="py-[20px] px-[15px]">
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

export default NavbatlarCards