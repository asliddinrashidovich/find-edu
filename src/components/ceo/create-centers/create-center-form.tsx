import { useState } from "react";
import ImageUpload from "./upload-file"
import axios, { AxiosError } from "axios";
import { IMajor, IMajors } from "@/interfaces";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const API = import.meta.env.VITE_API

function CreateCenterForm() {
    const token = localStorage.getItem('token')
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState<string>()
    const [regionId, setRegionId] = useState<number | null | undefined>(undefined)
    const [address, setAddress] = useState<string>('')
    const [image, setImage] = useState<string>()
    const [phone, setPhone] = useState<string>('')
    const [majorsId, setMajorItems] = useState<number[]>([])
    // const userDataRaw = localStorage.getItem('user');
    // const user: UserType | null = userDataRaw ? JSON.parse(userDataRaw) : null;

    
    const isSelected = name && regionId && address && phone && majorsId.length && image ? true : false 

    console.log("asdad", name, regionId, address, phone, majorsId, image)
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
              <select value={regionId ?? ""} onChange={(e) => setRegionId(Number(e.target.value))} id="hudud" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
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
              <ImageUpload setImage={setImage} onFileSelect={handleFileSelect} />
            </label>
            <label htmlFor="phone" className="mb-[15px] inline-block w-full">
              <p>Telefon raqami</p>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" type="tel" defaultValue={'+998'} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <p>Yo'nalishlar (kamida bittasini tanlang)</p>
              {centerMajor?.map(item => (
                <label key={item.id} htmlFor="yonalishlar" className="mb-[15px] inline-block w-full">
                  <input onChange={() => setMajorItems(prev => [...prev, item.id])} id="yo'nalishlar" type="checkbox" defaultValue={'+998'} className="border-[1px] rounded-[7px] py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
                  <span>{item.name}</span>
                </label>
              ))}
            <button disabled={isSelected ? false : true} className={`rounded-[7px] w-full p-[10px]  ${isSelected ? 'bg-[#451774] cursor-pointer' : 'bg-[#b56bff] cursor-not-allowed'} text-[#fff]`}>Markaz qo'shish</button>
          </form>
        </div>
        <div className="p-[20px] rounded-[15px] shadow-2xl">
          <h2 className="text-center text-[30px] font-[700] mb-[20px] text-[#451774]">Filial Yaratish</h2>
          <form>
            <label htmlFor="markaz" className="mb-[15px] inline-block w-full">
              <p>Markazni tanlang</p>
              <select id="markaz" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
                <option value="def">Select Region</option>
                <option value="Tashkent">Tashkent</option>
              </select>
            </label>
            <label htmlFor="markaz" className="mb-[15px] inline-block w-full">
              <p>Filial nomi</p>
              <input type="text" id="markaz" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[2px] focus:outline-[#38caff]" placeholder="Filial nomini kiriting"/>
            </label>
            <label htmlFor="qolda" className="mb-[15px] inline-block w-full gap-[5px]">
              <input id="qolda" type="checkbox" defaultValue={'+998'} className="border-[1px] rounded-[7px] py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
              <span>Filial nomini qo'lda kiritish</span>
            </label>
            <label htmlFor="phone" className="mb-[15px] inline-block w-full">
              <p>Telefon raqami</p>
              <input id="phone" type="text" defaultValue={'+998'} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <label htmlFor="hudud" className="mb-[15px] inline-block w-full">
              <p>Hudud</p>
              <select id="hudud" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
                <option value="def">Select Region</option>
                <option value="Tashkent">Tashkent</option>
              </select>
            </label>
            <label htmlFor="manzil" className="mb-[15px] inline-block w-full">
              <p>Manzil</p>
              <input id="manzil" type="text" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <label htmlFor="rasm" className="mb-[15px] inline-block w-full">
              <p className="mb-[10px]">Markaz rasmi <span className="text-[red]">*</span></p>
              {/* <ImageUpload   onFileSelect={handleFileSelect} /> */}
            </label>
            <button className="rounded-[7px] w-full p-[10px] bg-[#451774] text-[#fff] cursor-pointer">Markaz qo'shish</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateCenterForm