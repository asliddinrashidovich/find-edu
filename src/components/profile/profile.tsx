import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { FaArrowLeft } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"

function Profile() {
    const navigate = useNavigate()
    const handleEdit = ()  => {
        console.log('edit')
    }
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
        return res.data;
    };

    const { data: myData} = useQuery({
        queryKey: ["mydata"],
        queryFn: fetchMydata,
    });
  return (
    <div>
        <Link to={'/'} className="flex gap-[10px] items-center mb-[20px]">
            <FaArrowLeft className="text-[#451774]"/>
            <span className="text-[20px] text-[#451774]">Bosh sahifaga qaytish</span>
        </Link>
        <div className="flex items-center w-[400px] md:w-[800px] justify-between mb-[20px]">
            <h1 className="text-[30px] font-[600]">Mening Profilim</h1>
            <button onClick={() => handleEdit()} className="rounded-[7px] p-[10px] cursor-pointer bg-[#451774] flex items-center gap-[7px]">
                <MdEdit className="text-[#fff]"/>
                <p className="text-[#fff]">Profilni tahrirlash</p>
            </button>
        </div>
        <div className="flex gap-[30px] items-start mb-[30px]">
            <div className="w-[100px] shrink-0 h-[100px] rounded-full border-[2px] border-[#888]">
                <img src="https://openclipart.org/image/2000px/247319" alt="" />
            </div>
            <div className="grid grid-cols-2 w-full gap-[50px]">
                <div>
                    <h2 className="text-[20px] font-[700]">Ism</h2>
                    <p className="text-[17px] font-[400]">{myData?.data?.firstName}</p>
                </div>
                <div>
                    <h2 className="text-[20px] font-[700]">Familiya</h2>
                    <p className="text-[17px] font-[400]">{myData?.data?.lastName}</p>
                </div>
                <div>
                    <h2 className="text-[20px] font-[700]">Elektron pochta</h2>
                    <p className="text-[17px] font-[400]">{myData?.data?.email}</p>
                </div>
                <div>
                    <h2 className="text-[20px] font-[700]">Telefon</h2>
                    <p className="text-[17px] font-[400]">{myData?.data?.phone}</p>
                </div>
                <div>
                    <h2 className="text-[20px] font-[700]">Rol</h2>
                    <p className="text-[17px] font-[400]">{myData?.data?.role}</p>
                </div>
            </div>
        </div>
        <hr className="border-[1px] border-[#999] mb-[20px]"/>
        <button onClick={() => handleLogOut()} className="rounded-[7px] border-[#ef4444] border-[1px]  p-[10px] cursor-pointer bg-[#fff] flex items-center gap-[7px]">
            <MdEdit className="text-[#ef4444]"/>
            <p className="text-[#ef4444]">Accountni O'chirish</p>
        </button>
    </div>
  )
}

export default Profile