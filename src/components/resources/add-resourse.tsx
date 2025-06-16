import { Modal } from "antd"
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API

function AddResourse({setRefresh}: {setRefresh: React.Dispatch<React.SetStateAction<boolean>>}) {
    const token = localStorage.getItem('token')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState<string>("")
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [description, setDescription] = useState<string>()
    const [media, setMedia] = useState<string>()
    const [image, setImage] = useState<string>()
    const [imageFile, setImageFile] = useState<string>("")
    const [imageType, setImageType] = useState<boolean>(false)

    const showModal = () => {setIsModalOpen(true)}
    const handleCancel = () => {setIsModalOpen(false)};
    
    const isSelected = name && categoryId && description && media && (image || imageType)  ? true : false 
    
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
            setImageType(true)
            const imageUrl = res?.data?.data;
            setImage("https://findcourse.net.uz/api/image/" + imageUrl)
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Rasmni yuklashda xatolik");
        }
    }

    // add a resource
    async function handleOk(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await axios.post(`${API}/api/resources`, {categoryId, name, description, media, image}, {headers: { Authorization: `Bearer ${token}` } })
            setRefresh(prev => prev ? false : true)
            toast.success("The resource added successfully")
            setIsModalOpen(false)

            setImageFile("")
            setName("")
            setDescription("")
            setCategoryId(null)
            setMedia("")
            setImage("")
        }
        catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
        } 
    }
    console.log(categoryId, name, description, media, image)
  return (
    <div>
        <button onClick={showModal} className="py-[6px] px-[20px] rounded-[10px] cursor-pointer bg-[#451774] text-[#fff]">Resurs qo'shish</button>
        <Modal
            title="Yangi resurs qo‘shish"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
           <form onSubmit={handleOk}>
            <label htmlFor="type" className="mb-[15px] mt-[20px] inline-block w-full">
              <select onChange={(e) => setCategoryId(Number(e.target.value))} id="type" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
                <option value="3">Musiqa</option>
                <option value="4">Naqqoshlik</option>
                <option value="1">Sport</option>
                <option value="2">Ta'lim</option>
              </select>
            </label>
            <label  htmlFor="name" className="mb-[15px] inline-block w-full">
              <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Resurs nomi"/>
            </label>
            <label htmlFor="description" className="mb-[15px] inline-block w-full">
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" rows={3} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Tavsif"></textarea>
            </label>
            <label htmlFor="havola" className="mb-[15px] inline-block w-full">
              <input value={media} onChange={(e) => setMedia(e.target.value)} id="havola" type="url" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Media havolasi"/>
            </label>
            <label htmlFor="rasm" className="mb-[8px] inline-block w-full">
                <h5>Rasm (URL yoki fayl)</h5>
              <input value={image} disabled={imageType ? true : false} placeholder="Rasm havolasi" onChange={(e) => setImage(e.target.value)} id="rasm" type="url" className={`border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Rasm havolasi ${!imageType ? "cursor-pointer" : "cursor-not-allowed" }`}/>
            </label>
            <p className="text-[#999] mb-[10px]">-YOKI-</p>
            <label htmlFor="file" className="mb-[8px] inline-block w-full">
              <input value={imageFile} onChange={handleFileUpload} id="file" type="file" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]"  />
            </label>
            <div className="flex justify-end gap-[10px] mt-[20px]">
                <button type="button"  onClick={handleCancel} className="rounded-[7px]  p-[10px] bg-[#4d535b] text-[#fff] cursor-pointer">Bekor qilish</button>
                <button type="submit" disabled={isSelected ? false : true} className={`rounded-[7px]  p-[10px]   text-[#fff] ${isSelected ? 'bg-[#451774] cursor-pointer' : 'bg-[#b56bff] cursor-not-allowed'} `}>Resurs qo'shish</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}

export default AddResourse