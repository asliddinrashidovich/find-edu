import { useState } from "react";
import ImageUpload from "./upload-file"
import axios, { AxiosError } from "axios";
import { IMajor, IMajors } from "@/interfaces";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import CreateFilial from "./create-filial";

const API = import.meta.env.VITE_API

function CreateCenterForm() {
    const token = localStorage.getItem('token')
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState<string>()
    const [regionId, setRegionId] = useState<number | null | undefined>(undefined)
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [image, setImage] = useState<string | undefined>()
    const [cancelImage, setCancelImage] = useState<boolean>(false)
    const [majorsId, setMajorItems] = useState<number[]>([])
    
    const isSelected = name && regionId && address && phone && majorsId.length && image ? true : false 

    // get major
    const fetchCentersBranches = async () => {
        const res = await axios.get(`${API}/api/major`);
        return res.data.data
    };
    const { data: centerMajor} = useQuery<IMajor[]>({
        queryKey: ["coursesMajor1"],
        queryFn: fetchCentersBranches,
    });

    // get regions
    const fetchLocationsCenters = async () => {
        const res = await axios.get(`${API}/api/regions/search`);
        return res.data
    };
    const { data: centerLocations} = useQuery<IMajors>({
        queryKey: ["centersLocations1"],
        queryFn: fetchLocationsCenters,
    });

    // register
    async function handleCreateCenterSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await axios.post(`${API}/api/centers`, {name, regionId, address, phone, majorsId, image}, {headers: { Authorization: `Bearer ${token}` } })
            toast.success("The center created successfully")

            setName("")
            setAddress("")
            setRegionId(null)
            setImage("")
            setPhone("")
            setMajorItems([])
            setCancelImage(true)
        }
        catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
        }  
    }
    const handleFileSelect = (file: File | null) => {
      setSelectedFile(file);
      if (file) {
        console.log("Tanlangan fayl:", file.name, file.size);
        console.log(selectedFile)
      } else {
        console.log("Fayl o‘chirildi.");
      }
    };
  return (
    <section id="create_centers_mainsection" className="px-5 md:px-10 py-[80px]">
      <div className="max-w-[600px] lg:max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
        <div className="p-[20px] rounded-[15px] shadow-2xl">
          <h2 className="text-center text-[30px] font-[700] mb-[20px] text-[#451774]">O'quv Markaz Yaratish</h2>
          <form onSubmit={handleCreateCenterSubmit}>
            <label htmlFor="markaz" className="mb-[15px] inline-block w-full">
              <p>Markaz nomi</p>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="markaz" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[2px] focus:outline-[#38caff]" placeholder="Enter center name"/>
            </label>
            <label htmlFor="hudud" className="mb-[15px] inline-block w-full">
              <p>Hudud</p>
              <select value={regionId ?? ""} onChange={(e) => setRegionId(Number(e.target.value))} id="hudud" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]">
                <option defaultChecked value={'select major'}>Select Region</option>
                {centerLocations?.data.map((item) => (
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
            <label htmlFor="phone" className="mb-[15px] inline-block w-full">
              <p>Telefon raqami</p>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" type="tel" defaultValue={'+998'} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <p>Yo'nalishlar (kamida bittasini tanlang)</p>
              {centerMajor?.map(item => (
                <label key={item.id} htmlFor={item.name} className="mb-[15px] inline-block w-full">
                  <input onChange={(e) => {
                      if (e.target.checked) {
                        setMajorItems(prev => [...prev, item.id]);
                      } else {
                        setMajorItems(prev => prev.filter(id => id !== item.id));
                      }
                    }} id={item.name} type="checkbox"  className="border-[1px] rounded-[7px] py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
                  <span>{item.name}</span>
                </label>
              ))}
            <button disabled={isSelected ? false : true} className={`rounded-[7px] w-full p-[10px]  ${isSelected ? 'bg-[#451774] cursor-pointer' : 'bg-[#b56bff] cursor-not-allowed'} text-[#fff]`}>Markaz qo'shish</button>
          </form>
        </div>
        <div className="p-[20px] rounded-[15px] shadow-2xl">
          <CreateFilial/>
        </div>  
      </div>
    </section>
  )
}

export default CreateCenterForm