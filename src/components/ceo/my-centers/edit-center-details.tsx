import { filalType } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { Image } from "antd";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import EditFilial from "./edit-filial";

const API = import.meta.env.VITE_API

interface branchInterface {
    data: filalType
}

function MyCenterDetails() {
    const navigate = useNavigate()
    const {id} = useParams()
    const token = localStorage.getItem('token')
    const [centerName, setCenterName] = useState<string>()
    const [refresh, setRefresh] = useState<boolean>(false)
    const [address, setAddress] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [image, setImage] = useState<string | undefined>()
    const [imageFile, setImageFile] = useState<string>("")


    // get center details
    const fetchBranchDetails = async () => {
        const res = await axios.get(`${API}/api/centers/${id}`);
        setAddress(res?.data?.data?.address)
        setCenterName(res?.data?.data?.name)
        setPhone(res?.data?.data?.phone)
        return res.data
    };
    const { data: branchDetailsData} = useQuery<branchInterface>({
        queryKey: ["branchdetails", refresh],
        queryFn: fetchBranchDetails,
    });

    // register
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await axios.patch(`${API}/api/centers/${id}`, { name: centerName, address, phone, image}, {headers: { Authorization: `Bearer ${token}`} })
            toast.success("The center edited successfully")

            setRefresh(prev => prev ? false : true)
            setImageFile("")
        }
        catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
        }  
    }

    // upload an image
    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const res = await axios.post(`${API}/api/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const imageUrl = res?.data?.data;
            setImage(imageUrl)
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Rasmni yuklashda xatolik");
        }
    }
  return (
    <section className="px-5 md:px-10 pt-[100px]">
        <button onClick={() => navigate(`/my-centers`)} className="flex gap-[7px]  items-center hover:text-[#451774] transition-all duration-200 cursor-pointer mb-[30px]">
            <IoArrowBack className="text-[25px]"/>
            <span className="text-[20px]">Markazga qaytish</span>
        </button>
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 rounded-[20px] md:grid-cols-2 shadow-2xl mb-[70px]">
            <div className="bg-[#f3f3f3] h-[500px] rounded-[20px] overflow-hidden ">
                <Image width={'100%'} height={'100%'} className="w-full object-cover h-full" src={`https://findcourse.net.uz/api/image/${branchDetailsData?.data?.image}`} alt="center image" />
            </div>
            <div className="p-[30px]">
                <h3 className="text-[27px] font-[700] mb-[20px]">Markaz ma'lumotlarini tahrirlash</h3>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name" className="mb-[15px] inline-block w-full">
                    <p>Name</p>
                    <input value={centerName ?? ""} onChange={(e) => setCenterName(e.target.value)} type="text" id="name" className={`border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[2px]  focus:outline-[#38caff] `} placeholder="Center nomini kiriting"/>
                  </label>
                  <label htmlFor="manzil" className="mb-[15px] inline-block w-full">
                    <p>Address</p>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} id="manzil" type="text" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
                  </label>
                  <label htmlFor="phone" className="mb-[15px] inline-block w-full">
                    <p>Phone</p>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" type="tel" defaultValue={'+998'} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
                  </label>
                  <label htmlFor="file" className="mb-[8px] inline-block w-full">
                    <input value={imageFile} onChange={handleFileUpload} id="file" type="file" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]"  />
                  </label>
                  <p className="text-[12px] text-[#888] mb-[10px]">{image}</p>
                  <button  className={`rounded-[7px] w-full p-[10px]  bg-[#451774] cursor-pointer  text-[#fff]`}>O'zgartirishlarni saqlash</button>
              </form>
            </div>
        </div>
        <div className="max-w-[1000px] p-[20px] mx-auto rounded-[20px] shadow-2xl mb-[70px]">
          <EditFilial/>
        </div>
    </section>
  )
}

export default MyCenterDetails