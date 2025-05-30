import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { FaArrowLeft, FaCheck, FaTrashAlt } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import { FiDelete } from "react-icons/fi";

function Profile() {
    const [editPage, setEditPage] = useState(false)
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [telephone, setTelephone] = useState("")
    
    const navigate = useNavigate()

    const handleLogOut = ()  => {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload()
    }
    const token = localStorage.getItem('token');

    const fetchMydata = async () => {
        const res = await axios.get(`https://findcourse.net.uz/api/users/mydata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFname(res?.data?.data?.firstName)
        setLname(res?.data?.data?.lastName)
        setTelephone(res?.data?.data?.phone)
        return res.data;
    };

    const { data: myData} = useQuery({
        queryKey: ["mydata"],
        queryFn: fetchMydata,
    });

    // updata profile
    const handleSubmit = async () => {
        try {
            await axios.post(`https://findcourse.net.uz/api/users/${myData?.data?.id}`, {firstName: fname, lastName: lname, phone: telephone}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            alert('successs')
        } 
        catch(err) {
            console.log(err)
        }
    }
  return (
    <div>
        <Link to={'/'} className="flex gap-[10px] items-center mb-[20px]">
            <FaArrowLeft className="text-[#451774]"/>
            <span className="text-[20px] text-[#451774]">Bosh sahifaga qaytish</span>
        </Link>
        <div className="flex items-center w-[400px] md:w-[800px] justify-between mb-[20px]">
            <h1 className="text-[30px] font-[600]">Mening Profilim</h1>
            {!editPage && <button onClick={() => setEditPage(true)} className="rounded-[7px] p-[10px] cursor-pointer bg-[#451774] flex items-center gap-[7px]">
                <MdEdit className="text-[#fff]"/>
                <p className="text-[#fff]">Profilni tahrirlash</p>
            </button>}
        </div>
        <div className="flex gap-[30px] items-start mb-[30px]">
            <div className="w-[100px] shrink-0 h-[100px] rounded-full border-[2px] border-[#888]">
                <img src="https://openclipart.org/image/2000px/247319" alt="" />
            </div>
            <div className="grid grid-cols-2 w-full gap-[50px]">
                <div>
                    <h2 className="text-[20px] font-[700] mb-[5px]">Ism</h2>
                    {!editPage && <p className="text-[17px] font-[400]">{myData?.data?.firstName}</p>}
                    {editPage && <input onChange={(e) => setFname(e.target.value)} className="border-[1px] borrder-[#888] w-full p-[7px] rounded-[7px]" type="text" value={fname} />}
                </div>
                <div>
                    <h2 className="text-[20px] font-[700] mb-[5px]">Familiya</h2>
                    {!editPage && <p className="text-[17px] font-[400]">{myData?.data?.lastName}</p>}
                    {editPage && <input onChange={(e) => setLname(e.target.value)} className="border-[1px] borrder-[#888] w-full p-[7px] rounded-[7px]" type="text" value={lname} />}
                </div>
                <div>
                    <h2 className="text-[20px] font-[700] mb-[5px]">Elektron pochta</h2>
                    <p className="text-[17px] font-[400]">{myData?.data?.email}</p>
                </div>
                <div>
                    <h2 className="text-[20px] font-[700] mb-[5px]">Telefon</h2>
                    {!editPage && <p className="text-[17px] font-[400]">{myData?.data?.phone}</p>}
                    {editPage && <input onChange={(e) => setTelephone(e.target.value)} className="border-[1px] borrder-[#888] w-full p-[7px] rounded-[7px]" type="text" value={telephone} />}
                </div>
                <div>
                    <h2 className="text-[20px] font-[700] mb-[5px]">Rol</h2>
                    <p className="text-[17px] font-[400]">{myData?.data?.role}</p>
                </div>
                {editPage && <div className="col-span-2 flex items-center gap-[10px]">
                    <button onClick={() => handleSubmit()} className="rounded-[7px] p-[10px] cursor-pointer bg-[#22c55e] flex items-center gap-[10px]">
                        <FaCheck className="text-[#fff]"/>
                        <p className="text-[#fff]">O'zgarishlarni saqlash</p>
                    </button>
                    <button onClick={() => setEditPage(false)} className="rounded-[7px] border-[#ef4444] border-[1px]  p-[10px] cursor-pointer bg-[#fff] flex items-center gap-[10px]">
                        <FiDelete className="text-[#ef4444]"/>
                        <p className="text-[#ef4444]">Bekor qilish</p>
                    </button>
                </div>}
            </div>
        </div>
        {!editPage && <div>
            <hr className="border-[1px] border-[#999] mb-[20px]"/>
            <button onClick={() => handleLogOut()} className="rounded-[7px] border-[#ef4444] border-[1px]  p-[10px] cursor-pointer bg-[#fff] flex items-center gap-[7px]">
                <FaTrashAlt className="text-[#ef4444]"/>
                <p className="text-[#ef4444]">Accountni O'chirish</p>
            </button>
        </div>}
    </div>
  )
}

export default Profile