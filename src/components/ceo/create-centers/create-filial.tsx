import { IMajors, Iproduct } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import ImageUpload from "./upload-file";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API

function CreateFilial() {
        const token = localStorage.getItem('token')
        const [filialId, setFilialId] = useState<number | null | undefined>()
        const [filialName, setFilialName] = useState<string | null | undefined>("")
        const [selectbyFilial, setSelectByFilial] = useState<boolean>(false)
        const [regionId, setRegionId] = useState<number | null | undefined>(undefined)
        const [address, setAddress] = useState<string>('')
        const [phone, setPhone] = useState<string>('')
        const [image, setImage] = useState<string | undefined>()
        const [cancelImage, setCancelImage] = useState<boolean>(false)
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        
        
        const isSelected = filialId && regionId && filialName && phone && address && image ? true : false

        // get major
        const fetchCentersBranches = async () => {
            const res = await axios.get(`${API}/api/regions/search`);
            return res.data
        };
        const { data: centerLocations} = useQuery<IMajors>({
            queryKey: ["centersLocations2"],
            queryFn: fetchCentersBranches,
        });
    
        // get regions
        const fetchLocationsCenters = async () => {
            const res = await axios.get(`${API}/api/users/mycenters`,  {headers: { Authorization: `Bearer ${token}` } });
            return res.data
        };
        const { data: centerNames} = useQuery({
            queryKey: ["coursesMajor2"],
            queryFn: fetchLocationsCenters,
        });

        console.log("centerMajor", centerLocations)
        console.log("sssssssssss", selectbyFilial, filialName, filialId, regionId, phone, address )

         const handleFileSelect = (file: File | null) => {
            setSelectedFile(file);
            if (file) {
                console.log("Tanlangan fayl:", file.name, file.size);
                console.log(selectedFile)
            } else {
                console.log("Fayl o‘chirildi.");
            }
        };
        // register
        async function handleCreateCenterSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault()
            try {
                await axios.post(`${API}/api/filials`, { name: filialName, regionId, address, phone, centerId: filialId, image}, {headers: { Authorization: `Bearer ${token}` } })
                toast.success("The filial created successfully")

                setAddress("")
                setFilialId(null)
                setFilialName("")
                setRegionId(null)
                setImage("")
                setPhone("")
                setCancelImage(true)
            }
            catch (err) {
                const error = err as AxiosError<{ message: string }>;
                toast.error(error.response?.data?.message || "Something went wrong");
            }  
        }
  return (
    <div>
        <h2 className="text-center text-[30px] font-[700] mb-[20px] text-[#451774]">Filial Yaratish</h2>
          <form onSubmit={handleCreateCenterSubmit}>
            <label htmlFor="markaz" className="mb-[15px] inline-block w-full">
              <p>Markazni tanlang</p>
              <select value={`${filialId}-${filialName}`} onChange={(e) => {setFilialId(Number((e.target.value).split('-')[0])); setFilialName((e.target.value).split('-')[1])}} id="markaz" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
                <option defaultChecked value={'select center'}>Select Center</option>
                {centerNames?.data?.map((item: Iproduct) => (
                  <option key={item.id} value={`${item.id}-${item.name}`}>{item.name}</option>
                ))}
              </select>
            </label>
            <label htmlFor="markaz" className="mb-[15px] inline-block w-full">
              <p>Filial nomi</p>
              <input value={filialName ?? ""} onChange={(e) => setFilialName(e.target.value)} disabled={!selectbyFilial} type="text" id="markaz" className={`border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[2px]  focus:outline-[#38caff] ${selectbyFilial ? "curssor-pointee" : "cursor-not-allowed"}`} placeholder="Filial nomini kiriting"/>
            </label>
            <label htmlFor="qolda" className="mb-[15px] inline-block w-full gap-[5px]">
              <input id="qolda" type="checkbox" onChange={() => setSelectByFilial(prev => prev ? false : true)} className="border-[1px] rounded-[7px] py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
              <span>Filial nomini qo'lda kiritish</span>
            </label>
            <label htmlFor="phone" className="mb-[15px] inline-block w-full">
              <p>Telefon raqami</p>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" type="tel" defaultValue={'+998'} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <label htmlFor="hudud" className="mb-[15px] inline-block w-full">
              <p>Hudud</p>
              <select value={regionId ?? ""} onChange={(e) => setRegionId(Number(e.target.value))} id="hudud" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]">
                <option defaultChecked value={'select major'}>Select Region</option>
                {centerLocations?.data?.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
            <label htmlFor="manzil" className="mb-[15px] inline-block w-full">
              <p>Manzil</p>
              <input value={address} onChange={(e) => setAddress(e.target.value)} id="manzil" type="text" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <label htmlFor="rasm" className="mb-[15px] inline-block w-full">
              <p className="mb-[10px]">Markaz rasmi <span className="text-[red]">*</span></p>
              <ImageUpload cancelImage={cancelImage} setImage={setImage} onFileSelect={handleFileSelect} />
            </label>
            <button disabled={isSelected ? false : true} className={`rounded-[7px] w-full p-[10px]  ${isSelected ? 'bg-[#451774] cursor-pointer' : 'bg-[#b56bff] cursor-not-allowed'} text-[#fff]`}>Markaz qo'shish</button>
        </form>
    </div>
  )
}

export default CreateFilial