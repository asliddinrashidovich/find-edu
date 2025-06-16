import { ICategory, IResources, UserType } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaDownload, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5"
import NoData from "../no-data/no-data";
import CentersCardSkeleton from "../skeleton/cards-skleton";
import AddResourse from "./add-resourse";
import { Modal } from "antd";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API

function ResourcesCards() {
    const [activecategory, setActiveCategory] = useState('Barcha Resurslar')
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [userCategoryId, setUserCategryId] = useState<number | null>(null)
    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState<boolean>(false)
    const userDataRaw = localStorage.getItem('user');
    const user: UserType | null = userDataRaw ? JSON.parse(userDataRaw) : null;
    const [deleteId, setDeletedId] = useState<number | null>(null)
    const [isDeleting, setIsDeleting] = useState(false);
    const token = localStorage.getItem('token');

    // categories
    const fetchFilterCategory = async () => {
        const res = await axios.get(`${API}/api/categories`);
        return res.data
    };
    const { data: courseCAtegory} = useQuery({
        queryKey: ["category"],
        queryFn: fetchFilterCategory,
    });

     // delete item
    async function handleDelete(itemId: number) {
        setIsDeleting(true)
        await axios.delete(`${API}/api/resources/${itemId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            toast.success("The Resource deleted")
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

    // get all resources
    const fetchResources = async () => {
        const res = await axios.get(`${API}/api/resources`)
        const allResources = res?.data?.data
        if(categoryId) {
            const filtered = allResources.filter((resurs: IResources) =>  resurs?.categoryId == categoryId);
            const searched = filtered.filter((itemResurs: IResources) => itemResurs?.name.toLowerCase().includes(search.toLowerCase())) 
            return searched
        } else if (userCategoryId) {
            const filtered = allResources.filter((resurs: IResources) =>  resurs?.userId == userCategoryId);
            const searched = filtered.filter((itemResurs: IResources) => itemResurs?.name.toLowerCase().includes(search.toLowerCase())) 
            return searched
        } else {
            const searched = allResources.filter((itemResurs: IResources) => itemResurs?.name.toLowerCase().includes(search.toLowerCase())) 
            return searched
        }
    };
    const { data: resources, isLoading: loading} = useQuery({
        queryKey: ["resources", categoryId, userCategoryId, search, refresh],
        queryFn: fetchResources,
    });
    
    // change cateogry
    function handleChangeCategory(name: string, itemId: number | null, userId: number | null | undefined) {
        setActiveCategory(name)
        setCategoryId(itemId)
        setUserCategryId(Number(userId))
    }
    const handleSearch = (value: string) => {setSearch(value)}
  return (
    <section id="resources_mainsection" className="py-[80px] px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto ">
            <form className="p-[10px] flex items-center gap-[15px] rounded-[6px] border-[1px] border-[#999]">
                <button type="submit" className="cursor-pointer">
                    <IoSearchOutline className="text-[20px]"/>
                </button>
                <input value={search} onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="Resurslar qidirish" className="w-[400px] lg:w-[600px] outline-none"/>
            </form>
            <h2 className="text-[20px] py-[20px] font-[700]">Kategoriya bo‘yicha filtrlash</h2>
            <div className="flex justify-center md:justify-start flex-wrap gap-[20px] mb-[40px]">
                <div onClick={() => handleChangeCategory("Barcha Resurslar", null, null)} className={` w-[100px] md:w-[170px] rounded-[10px] ${activecategory == "Barcha Resurslar" ? "border-[3px] border-[#0080ff]" : "border-[3px] border-transparent"} shadow-sm overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-200`}>
                    <div className="bg-[#f3f4f6] h-[70px] md:h-[130px] flex items-center justify-center">
                        <IoSearchSharp className="text-[40px]"/>
                    </div>
                    <h2 className="py-[10px] text-center">Barcha Resurslar</h2>
                </div>
                <div onClick={() => handleChangeCategory("Mening Resurslarim", null, user?.id)} className={`w-[100px] md:w-[170px] rounded-[10px] ${activecategory == "Mening Resurslarim" ? "border-[3px] border-[#0080ff]" : "border-[3px] border-transparent"} shadow-sm overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-200`} >
                    <div className="bg-[#f3f4f6] h-[70px] md:h-[130px] flex items-center justify-center ">
                        <FaStar className="text-[40px] text-[gold]"/>
                    </div>
                    <h2 className="py-[10px] text-center">Mening Resurslarim</h2>
                </div>
                {courseCAtegory?.data?.map((item: ICategory) => (
                    <div onClick={() => handleChangeCategory(item.name, item.id, null)} className={`w-[100px] md:w-[170px] rounded-[10px] ${activecategory == item.name ? "border-[3px] border-[#0080ff]" : "border-[3px] border-transparent"} overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-200 shadow-sm`}>
                        <div className="h-[70px] md:h-[130px] bg-[#f3f4f6]">
                            <img src={`/resources/${item.id}${item.image}`} alt="" className="object-contain h-[70px] md:h-[130px] w-full" />
                        </div>
                        <h2 className="py-[10px] text-center">{item.name}</h2>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mb-[50px]">
                <AddResourse setRefresh={setRefresh}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 justify-between md:grid-cols-3 gap-[40px]">
                {resources?.map((item: IResources) => (
                    <div key={item.id} className="rounded-[15px] shadow-xl overflow-hidden hover:scale-[103%] translate-all duration-200">
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
                                <a href={item.media} target="_blank"  className="text-[#451774] text-[14px] cursor-pointer hover:underline">Oldindan Ko'rish</a>
                                <div className="flex gap-[6px] items-center">
                                    {user?.id == item.userId && <button onClick={() => setDeletedId(item.id)}  className="py-[6px] px-[10px] rounded-[20px] bg-[#ff4800] cursor-pointer  text-[#fff] text-[12px] flex items-center gap-[5px] ">
                                        <FaRegTrashAlt  className="shrink-0"/>
                                        <span className="text-wrap">O'chirish</span>
                                    </button>}
                                    <a href={item.media} target="_blank" className="py-[6px] px-[10px] rounded-[20px] bg-[#451774] cursor-pointer  text-[#fff] text-[12px] flex items-center gap-[5px] ">
                                        <FaDownload  className="shrink-0"/>
                                        <span className="text-nowrap">Yuklab olish</span>
                                    </a>
                                </div>
                                <Modal
                                    title="Resursni o‘chirishni tasdiqlash"
                                    closable={{ 'aria-label': 'Custom Close Button' }}
                                    open={deleteId == item.id}
                                    onOk={() => handleDelete(item.id)}
                                    onCancel={() => setDeletedId(null)}
                                    okText={isDeleting ? "O'chirilmoqda" : "Ok"}
                                    okButtonProps={{ disabled: isDeleting }}
                                >
                                    <p>Siz ushbu resursni o‘chirishni istaysizmi? Bu amalni bekor qilib bo‘lmaydi.</p>
                                </Modal>
                            </div>
                        </div>
                    </div>
                ))}
                {!loading && Array.isArray(resources) && !resources.length && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 ">
                        <NoData>Resurslar topilmadi</NoData>
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

export default ResourcesCards