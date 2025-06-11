import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPowerOff } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { IoMdAddCircle } from "react-icons/io";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import HeaderSidebar from "./header-sidebar";
import LanguageChanger from "./language-changer";
import AuthComponent from "./auth-component";
import { NavbarData } from "@/data/data";

const API = import.meta.env.VITE_API

function Header() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const url = useLocation()

    const fetchMydata = async () => {
        const res = await axios.get(`${API}/api/users/mydata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
    };

    // skrolling header
    const [scrolled, setScrolled] = useState(false);
    const skrolledCase = scrolled || url.pathname == '/login' || url.pathname == '/register' || url.pathname == '/register/verify-otp' || url.pathname == '/profile'

    useEffect(() => {
        const handleScroll = () => {setScrolled(window.scrollY > 50);};
        window.addEventListener("scroll", handleScroll);
        return () => {window.removeEventListener("scroll", handleScroll)};
    }, []);

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
    <header className={`${skrolledCase ? "bg-[#e1e1e1] shadow-xl" : "bg-transparent"} px-5 md:px-10 py-[15px] fixed w-full z-99`}>
      <div className="flex items-center justify-between gap-[10px]">
        <Link to={'/'} className={`max-w-[200px] ${skrolledCase ? "brightness-100" : "brightness-300"} `}>
          <img src="/logo.png" alt="logo" />
        </Link>
        <ul className="hidden lg:flex gap-[20px] items-center">
          {NavbarData.map((item) => (
            <li className="group" key={item.text}>
              <Link to={item.slug} className={`${skrolledCase ? "group-hover:text-[#461773] text-[#000] " : "text-[#fff] group-hover:text-[#ce9aff]"} transition-all duration-150 ${url.pathname == item.slug ? "font-[700]" : "font-[500]"}  font-['Open_Sans'] text-[16px]`}>
                {item.text}
                <div className={`h-[3px] rounded-[3px] group-hover:w-full w-[0px] transition-all duration-200 ${ skrolledCase ? "bg-[#461773]" : "bg-[#ce9aff]"}`}></div>
              </Link>
            </li>
          ))}
          {token &&  <li className="group">
            <Link to={'/appointment'} className={`${skrolledCase ? "group-hover:text-[#461773] text-[#000] " : "text-[#fff] group-hover:text-[#ce9aff]"} transition-all duration-150 ${url.pathname == '/favorites' ? "font-[700]" : "font-[500]"}  font-['Open_Sans'] text-[16px]`}>
              Navbatlar
              <div className={`h-[3px] rounded-[3px] group-hover:w-full w-[0px] transition-all duration-200 ${ skrolledCase ? "bg-[#461773]" : "bg-[#ce9aff]"}`}></div>
            </Link>
          </li>}
          {token && <li>
            <div className="group relative">
              <div className={`${skrolledCase ? "group-hover:text-[#461773] text-[#000] " : "text-[#fff] group-hover:text-[#ce9aff]"} transition-all duration-150 cursor-pointer ${url.pathname == '/favorites' ? "font-[700]" : "font-[500]"}  font-['Open_Sans'] text-[16px]`}>
                CEO boshqaruv paneli
              </div>

              <div className="group-hover:flex hidden absolute w-[200px]  p-[5px] bg-[#fff] rounded-[5px] flex-col">
                  <button onClick={() => navigate("/create-centers")} className="rounded-[7px] p-[5px] cursor-pointer hover:bg-[#461773] hover:text-[#fff] transition-all  duration-200  flex items-center gap-[7px]">
                    <IoMdAddCircle />
                    <p>Markaz yaratish</p>
                  </button>
                  <button onClick={() => navigate("/my-centers")} className="rounded-[7px] p-[5px] cursor-pointer hover:bg-[#461773] hover:text-[#fff] transition-all  duration-200  flex items-center gap-[7px]">
                    <HiMiniBuildingOffice2 />
                    <p>Mening markazlarim</p>
                  </button>
              </div>
            </div>
          </li>}
        </ul>
        <div className="flex gap-[10px] items-center">
          <div className="hidden md:flex">
            <LanguageChanger/>
          </div>
          <AuthComponent/>
          {token && <div className="group hidden md:block relative">
            <div className="flex rounded-[50px] cursor-pointer group-hover:bg-[#461773] text-[#fff] p-[3px] pr-[10px] items-center gap-[10px]">
              <div className="rounded-full bg-[#999] h-[30px] w-[30px] border-[1px] border-[#888]">
                <img src="https://openclipart.org/image/2000px/247319" alt="" />
              </div>
              <div>
                <h2>{myData?.data?.firstName} {myData?.data?.lastName}</h2>
              </div>
            </div>

            <div className="group-hover:flex right-[0px] hidden max-w-[300px] absolute  p-[10px] bg-[#fff] rounded-[5px] flex-col">
                <h2 className="text-[14px] font-[600] leading-[60%] mt-[10px]">{myData?.data?.firstName} {myData?.data?.lastName}</h2>
                <p className="text-[14px] font-[300]">{myData?.data?.email}</p>
                <button onClick={() => navigate("/profile")} className="rounded-[7px] p-[5px] cursor-pointer hover:bg-[#461773] flex items-center gap-[7px] hover:text-[#fff] transition-all duration-200 mb-[5px]">
                  <MdEdit />
                  <p>Profilni tahrirlash</p>
                </button>
                <button onClick={handleLogout} className="rounded-[7px] p-[5px] cursor-pointer hover:bg-[#461773] flex items-center gap-[7px]">
                  <FaPowerOff className="text-[red]"/>
                  <p className="text-[red]">Chiqish</p>
                </button>
            </div>
          </div>}
          <HeaderSidebar myData={myData?.data}/>
        </div>
      </div>
    </header>
  )
}

export default Header