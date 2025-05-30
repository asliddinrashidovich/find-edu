import { useQuery } from "@tanstack/react-query";
import { Select } from "antd"
import axios from "axios";
import { FaPowerOff } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"
import { IoMdAddCircle } from "react-icons/io";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";

function Header() {
    const navigate = useNavigate()
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

    const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      window.location.reload()
    }

    console.log(myData)
  return (
    <header className="bg-[#fff] px-5 md:px-10 py-[15px] fixed w-full z-99">
      <div className="flex items-center justify-between">
        <Link to={'/'} className="max-w-[200px]">
          <img src="/logo.png" alt="logo" />
        </Link>
        <ul className="hidden lg:flex gap-[20px] items-center">
          <li>
            <Link to={'/'} className="text-[#5d556a]">
              Bosh sahifa
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-[#5d556a]">
              Biz haqimizda
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-[#5d556a]">
              Resurslar
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-[#5d556a]">
              Sevimlilar
            </Link>
          </li>
          {token &&  <li>
            <Link to={'/appointment'} className="text-[#5d556a]">
              Navbatlar
            </Link>
          </li>}
          {myData?.data?.role == 'CEO' &&  <li>
            <div className="group relative">
              <div className="cursor-pointer">
                <h2 className="text-[#5d556a]">CEO boshqaruv paneli</h2>
              </div>

              <div className="group-hover:flex hidden absolute w-[200px]  p-[10px] bg-[#fff] rounded-[5px] flex-col">
                  <button onClick={() => navigate("/create-centers")} className="rounded-[7px] p-[5px] cursor-pointer hover:bg-[#de9a7a] flex items-center gap-[7px]">
                    <IoMdAddCircle />
                    <p>Markaz yaratish</p>
                  </button>
                  <button onClick={() => navigate("/my-centers")} className="rounded-[7px] p-[5px] cursor-pointer hover:bg-[#de9a7a] flex items-center gap-[7px]">
                    <HiMiniBuildingOffice2 />
                    <p>Mening markazlarim</p>
                  </button>
              </div>
            </div>
          </li>}
        </ul>
        <div className="flex gap-[20px] items-center">
          <Select
              dropdownStyle={{
                  background: 'white',
                  boxShadow: 'none',
                  borderRadius: 0,
              }}
              defaultValue="en"
              style={{ width: 60 }}
              options={[
                  { value: 'en', label: 'en' },
                  { value: 'uz', label: 'uz' },
                  { value: 'ru', label: 'ru' },
              ]}
          />
          {!token && <div className="hidden md:flex gap-[7px] items-center">
              <Link to={'/login'} className="border-[1px] border-[#461773] text-[#461773] rounded-[30px] cursor-pointer px-[20px] py-[5px]">
                Kirish
              </Link>
              <Link to={'/register'} className=" bg-[#461773] text-[#fff] rounded-[30px] cursor-pointer px-[20px] py-[5px]">
                Ro'yxatdan o'tish
              </Link>
            </div>
          } 
          {token && <div className="group relative">
            <div className="flex rounded-[50px] cursor-pointer group-hover:bg-[#de9a7a] p-[3px] pr-[10px] items-center gap-[10px]">
              <div className="rounded-full bg-[#999] h-[30px] w-[30px] border-[1px] border-[#888]">
                <img src="https://openclipart.org/image/2000px/247319" alt="" />
              </div>
              <div>
                <h2>{myData?.data?.firstName} {myData?.data?.lastName}</h2>
              </div>
            </div>

            <div className="group-hover:flex right-[0px] hidden w-[200px] absolute  p-[10px] bg-[#fff] rounded-[5px] flex-col">
                <h2 className="text-[14px] font-[600] leading-[60%] mt-[10px]">{myData?.data?.firstName} {myData?.data?.lastName}</h2>
                <p className="text-[14px] font-[300]">{myData?.data?.email}</p>
                <button onClick={() => navigate("/profile")} className="rounded-[7px] p-[5px] cursor-pointer hover:bg-[#de9a7a] flex items-center gap-[7px]">
                  <MdEdit />
                  <p>Profilni tahrirlash</p>
                </button>
                <button onClick={handleLogout} className="rounded-[7px] p-[5px] cursor-pointer hover:bg-[#de9a7a] flex items-center gap-[7px]">
                  <FaPowerOff className="text-[red]"/>
                  <p className="text-[red]">Chiqish</p>
                </button>
            </div>
          </div>
          }
        </div>
      </div>
    </header>
  )
}

export default Header