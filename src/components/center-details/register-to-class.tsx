import { filalType, IMajor } from "@/interfaces";
import { Modal } from "antd";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineWatchLater } from "react-icons/md"
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API

function RegisterToClass({filials, majors}: {filials: filalType[] | undefined; majors: IMajor[] | undefined}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem('token')
    const {id} = useParams()
    const [filialId, setFilialId] = useState<number>()
    const [majorId, setMajorId] = useState<number>()
    const [visitDate1, setVisitDate] = useState<string>('')
    const [visitTime, setVisitTime] = useState<string>('')

    const isSelected = filialId && majorId && visitDate1 && visitTime ? true : false 
    const showModal = () => {setIsModalOpen(true)};
    const handleOk = () => {setIsModalOpen(false)};
    const handleCancel = () => {setIsModalOpen(false)};

     // register
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await axios.post(`${API}/api/reseption`, {centerId: id, filialId, majorId, visitDate: visitDate1 + ' ' + visitTime}, {headers: { Authorization: `Bearer ${token}` } })
        }
        catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            // setLoadingComment(false)
        }
    }
    console.log(id, filialId, majorId, visitDate1 + ' ' + visitTime)
  return (
    <div>
        <button onClick={showModal} className="bg-[#451774] hover:bg-[#c78eff] transition-all saturate-150 flex items-center gap-[10px] cursor-pointer p-[10px] rounded-[10px] text-[#fff]">
            <MdOutlineWatchLater  className="text-[20px] "/>
            Darsga yozilish
        </button>
        <Modal
            title="Darsga yozilish"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <p className="text-[15px] text-[#451774] font-[500] mb-[30px]">O'zingizga qulay sana va vaqtni tanlang</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="filial" className="mb-[15px] inline-block w-full">
                    <p className="mb-[4px]">Filialni tanlang</p>
                    <select onChange={(e) => setFilialId(Number(e.target.value))} id="filial" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
                        <option defaultChecked value={'select filial'}>Select Filial</option>
                        {filials?.map(item => (
                            <option value={item.id}>{item.address}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="yonalish" className="mb-[15px] inline-block w-full">
                    <p className="mb-[4px]">Yo'nalishni tanlang</p>
                    <select onChange={(e) => setMajorId(Number(e.target.value))} id="yonalish" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
                        <option defaultChecked value={'select major'}>Select major</option>
                        {majors?.map(item => (
                            <option value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </label>
                <div className="flex gap-[20px] items-center justify-between">
                    <label htmlFor="sana" className="mb-[15px] inline-block w-full">
                        <p>Sanani tanlang</p>
                        <input onChange={(e) => setVisitDate(String(e.target.value))} id="sana" type="date" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" />
                    </label>
                    <label htmlFor="time" className="mb-[15px] inline-block w-full">
                        <p className="mb-[4px]">Vaqtni tanlang</p>
                        <input onChange={(e) => setVisitTime(String(e.target.value))} id="time" type="time" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]"/>
                    </label>
                </div>
                <div className="flex items-center justify-end gap-[15px] mt-[30px]">
                    <button onClick={handleCancel} type="button" className="rounded-[7px] px-[25px] py-[10px] bg-[#fff] text-[#333] border-[1px] border-[#333] cursor-pointer">Bekor qilish</button>
                    <button disabled={isSelected ? false : true} type="submit" className={`rounded-[7px] px-[25px] py-[10px] ${isSelected ? 'bg-[#451774] cursor-pointer' : 'bg-[#b56bff] cursor-not-allowed'}  text-[#fff] `}>Confirm Registration</button>
                </div>
            </form>
        </Modal>
    </div>
  )
}

export default RegisterToClass