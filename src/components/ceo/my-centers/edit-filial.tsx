import { filalType, IMajors, Iproduct } from "@/interfaces"
import { useQuery } from "@tanstack/react-query"
import { Modal } from "antd"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { FaTrashAlt } from "react-icons/fa"
import { IoAddSharp } from "react-icons/io5"
import { MdModeEditOutline } from "react-icons/md"
import { useParams } from "react-router-dom"

const API = import.meta.env.VITE_API
interface branchInterface {
    data: Iproduct
}

function EditFilial() {
    const token = localStorage.getItem('token')
    const {id} = useParams()
    const [refresh, setRefresh] = useState<boolean>(false)
    const [modalCase, setModalCase] = useState<string>("")

    const [filialName, setFilialName] = useState<string>()
    const [address, setAddress] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [regionId, setRegionId] = useState<number | null | undefined>(undefined)
    const [image, setImage] = useState<string | undefined>()
    const [imageFile, setImageFile] = useState<string>("")
    const [filialId, setFilialId] = useState<number>()
    

    const [filialName2, setFilialName2] = useState<string>()
    const [address2, setAddress2] = useState<string>()
    const [phone2, setPhone2] = useState<string>()
    const [regionId2, setRegionId2] = useState<number | null | undefined>(undefined)
    const [image2, setImage2] = useState<string | undefined>()
    const [imageFile2, setImageFile2] = useState<string>("")

    const [filialData, setFilialData] = useState<filalType>()
    const [deleteId, setDeleteId] = useState<number | null>(null);

    console.log(filialData)
    // get regions
    const fetchLocationsCenters = async () => {
        const res = await axios.get(`${API}/api/regions/search`);
        return res.data
    };
    const { data: centerLocations} = useQuery<IMajors>({
        queryKey: ["centersLocations1"],
        queryFn: fetchLocationsCenters,
    });

    // get center details
    const fetchBranchDetails = async () => {
        const res = await axios.get(`${API}/api/centers/${id}`);
        return res.data
    };
    const { data: branchDetailsData} = useQuery<branchInterface>({
        queryKey: ["branchdetails", refresh],
        queryFn: fetchBranchDetails,
    });

    console.log(branchDetailsData)

     // edit filial
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await axios.patch(`${API}/api/filials/${filialId}`, { name: filialName, address, phone, image}, {headers: { Authorization: `Bearer ${token}`} })
            toast.success("The Filial edited successfully")
            setRefresh(prev => prev ? false : true)
            setImageFile2("")
        }
        catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
        }  
    }

    // add filial
    async function handleSubmit2(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await axios.post(`${API}/api/filials`, { name: filialName2,address: address2, centerId: Number(id), regionId: regionId2, phone: phone2, image: image2}, {headers: { Authorization: `Bearer ${token}`}})
            toast.success("The New filial added successfully")
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

     // upload an image
    async function handleFileUpload2(e: React.ChangeEvent<HTMLInputElement>) {
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
            setImage2(imageUrl)
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Rasmni yuklashda xatolik");
        }
    }

    function handleChangeEditPage(filial: filalType) {
        setFilialData(filial)
        setModalCase("edit")

        setFilialName(filial.name)
        setPhone(filial.phone)
        setAddress(filial.address)
        setImage(filial.image)
        setRegionId(filial.regionId)
        setFilialId(filial.id)
    }

     // handle Delete
    async function handleDelete(deletedId: number) {
        try {
            await axios.delete(`${API}/api/filials/${deletedId}`, {headers: {Authorization: `Bearer ${token}`}})
            setRefresh(prev => prev ? false : true)
            toast.success('The Filial Deleted')
        }
        catch (err) {
          const error = err as AxiosError<{ message: string }>;
          toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
  return (
    <div>
        <div className="flex items-center justify-between mb-[50px]">
            <h3 className="text-[25px] font-[700]">Filiallar</h3>
            <button onClick={() => setModalCase('add')} className={`rounded-[7px] flex items-center gap-[5px] p-[10px] ml-auto bg-[#451774] cursor-pointer text-[#fff]`}>
                <IoAddSharp className="text-[20px]"/>
                Filial qo'shish
            </button>
        </div>
        {modalCase == "edit" && <div className="p-[20px]">
            <h4 className="text-[20px] font-[500] mb-[30px]">Filialni tahrirlash</h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-[30px]">
                  <label htmlFor="name" className="mb-[15px] inline-block w-full">
                    <p>Name</p>
                    <input value={filialName ?? ""} onChange={(e) => setFilialName(e.target.value)} type="text" id="name" className={`border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[2px]  focus:outline-[#38caff] `} placeholder="Filiial nomini kiriting"/>
                  </label>
                  <label htmlFor="phone" className="mb-[15px] inline-block w-full">
                    <p>Phone</p>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" type="tel" defaultValue={'+998'} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
                  </label>
                  <label htmlFor="manzil" className="mb-[15px] inline-block w-full">
                    <p>Address</p>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} id="manzil" type="text" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
                  </label>
                  <label htmlFor="Locations" className="mb-[15px] inline-block w-full">
                    <p>Location</p>
                    <select value={regionId ?? ""} onChange={(e) => setRegionId(Number(e.target.value))} id="hudud" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]">
                        <option defaultChecked value={'select major'}>Select Region</option>
                        {centerLocations?.data.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    </label>
                  <label htmlFor="file" className="mb-[8px] inline-block w-full">
                    <p>Image</p>
                    <input value={imageFile} onChange={handleFileUpload} id="file" type="file" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]"  />
                    <p className="text-[12px] text-[#888] mb-[10px]">{image}</p>
                  </label>
                  <div className="col-span-2 flex gap-[20px] justify-end">
                    <button onClick={() => setModalCase("")} type="button" className={`rounded-[7px] p-[10px] border-[2px] border-[#451774] cursor-pointer  text-[#000]`}>Bekor qilish</button>
                    <button type="submit"  className={`rounded-[7px] p-[10px]  bg-[#451774] cursor-pointer  text-[#fff]`}>Filialni yangilash</button>
                  </div>
              </form>
        </div>}
        {modalCase == "add" && <div className="p-[20px]">
            <h4 className="text-[20px] font-[500] mb-[30px]">Filialni tahrirlash</h4>
            <form onSubmit={handleSubmit2} className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-[30px]">
                  <label htmlFor="name" className="mb-[15px] inline-block w-full">
                    <p>Name</p>
                    <input value={filialName2 ?? ""} onChange={(e) => setFilialName2(e.target.value)} type="text" id="name" className={`border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[2px]  focus:outline-[#38caff] `} placeholder="Filiial nomini kiriting"/>
                  </label>
                  <label htmlFor="phone" className="mb-[15px] inline-block w-full">
                    <p>Phone</p>
                    <input value={phone2} onChange={(e) => setPhone2(e.target.value)} id="phone" type="tel" defaultValue={'+998'} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
                  </label>
                  <label htmlFor="manzil" className="mb-[15px] inline-block w-full">
                    <p>Address</p>
                    <input value={address2} onChange={(e) => setAddress2(e.target.value)} id="manzil" type="text" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
                  </label>
                  <label htmlFor="Locations" className="mb-[15px] inline-block w-full">
                    <p>Location</p>
                    <select value={regionId2 ?? ""} onChange={(e) => setRegionId2(Number(e.target.value))} id="hudud" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]">
                        <option defaultChecked value={'select major'}>Select Region</option>
                        {centerLocations?.data.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    </label>
                  <label htmlFor="file" className="mb-[8px] inline-block w-full">
                    <p>Image</p>
                    <input value={imageFile2} onChange={handleFileUpload2} id="file" type="file" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]"  />
                    <p className="text-[12px] text-[#888] mb-[10px]">{image}</p>
                  </label>
                  <div className="col-span-2 flex gap-[20px] justify-end">
                    <button onClick={() => setModalCase("")} type="button" className={`rounded-[7px] p-[10px] border-[2px] border-[#451774] cursor-pointer  text-[#000]`}>Bekor qilish</button>
                    <button type="submit"  className={`rounded-[7px] p-[10px]  bg-[#451774] cursor-pointer  text-[#fff]`}>Filial Yaratish</button>
                  </div>
              </form>
        </div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {branchDetailsData?.data?.filials?.map(item => (
                <div className="border-[1px] rounded-[10px] p-[15px] mb-[10px]" key={item.id}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-[22px] font-[600]">{item.name}</h3>
                        <div className="flex gap-[10px]">
                            <button onClick={() => handleChangeEditPage(item)} className="cursor-pointer">
                                <MdModeEditOutline  className="text-[#451774] text-[22px]"/>
                            </button>
                            <button onClick={() => setDeleteId(item.id)} className="cursor-pointer text-[22px]">
                                <FaTrashAlt className="text-[#ff4e18]"/>
                            </button>
                             <Modal
                                title="Centerni o‘chirish"
                                open={deleteId === item.id}
                                onOk={() => handleDelete(item.id)}
                                onCancel={() => setDeleteId(null)}
                            >
                                <p>Haqiqatdan ham shu centerni o'chirishni istaysizmi</p>
                            </Modal>
                        </div>
                    </div>
                    <p className="text-[16px] text-[#888] ">{item.address}</p>
                    <p className="text-[16px] text-[#888] mb-[13px]">{item.phone}</p>
                    <div className="w-full h-[250px] overflow-hidden rounded-[10px]">
                        <img src={`https://findcourse.net.uz/api/image/${item.image}`} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EditFilial