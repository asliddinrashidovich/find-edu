import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5"
import axios from "axios";
import { MdLocalPhone } from "react-icons/md";
import { Iproduct, likedProductType, UserType } from "@/interfaces";
import { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdHeart } from "react-icons/io";

const API = import.meta.env.VITE_API

function FavoritesSection() {
    const [search, setSearch] = useState<string>("")
    const [liked, setLiked] = useState<boolean>(false)
    const token = localStorage.getItem('token');
    const userDataRaw = localStorage.getItem('user');
    const user: UserType | null = userDataRaw ? JSON.parse(userDataRaw) : null;
    const navigate = useNavigate()

    console.log(user?.likes)
    const handleSearch = (value: string) => {
        setSearch(value)
    }
    const fetchMydata = async () => {
        const res = await axios.get(`${API}/api/users/mydata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem('user', JSON.stringify(res.data.data))
        return res.data;
    };
      
    const { data: myData} = useQuery({
        queryKey: ["mydataforLikes", liked],
        queryFn: fetchMydata,
    });
    console.log(myData)
    const fetchStudyCenter = async () => {
        const res = await axios.get(`${API}/api/centers`);
        const allProducts =  res?.data?.data;
        const allIdOfCenters = user?.likes.map(item => item.centerId) 
        const filtered = allProducts.filter((product: Iproduct) => allIdOfCenters?.includes(product.id) );
        return filtered
    };

    const { data: coursesData} = useQuery({
        queryKey: ["coursesLiked", search, liked, user],
        queryFn: fetchStudyCenter,
    });

    // like item
    async function handleLike(centerId: number) {
        await axios.post(`${API}/api/liked`, {centerId}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            console.log('liked')
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
            console.log('unliked')
            setLiked(prev => prev ? false : true)
        }).catch((err) => {
            if(err.status == 401) {
                toast.error('Please Login to like centers')
            } else {
                toast.error('Something went wrong')
            }
        })
    }

    function handleClick(id: number) {
        navigate(`/centers/${id}`)
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
                <button className="text-[#fff] p-[10px] bg-[#451774] rounded-[10px] cursor-pointer">
                    Kurslar va Hududlar
                </button>
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
            </div>
        </div>
    </section>
  )
}

export default FavoritesSection