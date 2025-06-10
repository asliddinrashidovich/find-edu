import { useState } from "react"
import { FaBarsStaggered } from "react-icons/fa6"
import { Link } from "react-router-dom"

function HeaderSidebar() {
    const [openSidebar, setOpenSideBar] = useState<boolean>(false)
    function handleOpen() {setOpenSideBar(true)}
    function handleClose() {setOpenSideBar(false)}
    const token = localStorage.getItem('token');
  return (
    <div className="lg:hidden flex">
        <button onClick={handleOpen} className="lg:hidden flex cursor-pointer">
            <FaBarsStaggered className="text-[#fff] text-[25px]"/>
        </button>
        {<div className={`fixed top-0 ${openSidebar ? "translate-x-0" : "translate-x-[100%]"} transition-liniar duration-200  right-0 bottom-0 bg-[#fff] w-[40%] z-30 `}>
            <div className="w-full h-[120px] bg-[#00000040] flex items-center px-[20px]">
                <div className="w-[80px] h-[80px] rounded-full bg-[#fff]">
                    
                </div>
            </div>
            <div className="p-[20px] flex gap-[13px] flex-col">
            <Link to={'/'} className="rounded-[6px] w-[100%] flex gap-[7px] justify-start px-[20px] py-[10px] items-center bg-[#EBEFF3] relative">
                <h3 className="text-[#545d6a]">Bosh sahifa</h3>
            </Link>
            <Link to={'/'} className="rounded-[6px] w-[100%] flex gap-[7px] justify-start px-[20px] py-[10px] items-center bg-[#EBEFF3] relative">
                <h3 className="text-[#545d6a]">Biz haqimizda</h3>
            </Link>
            <Link to={'/'} className="rounded-[6px] w-[100%] flex gap-[7px] justify-start px-[20px] py-[10px] items-center bg-[#EBEFF3] relative">
                <h3 className="text-[#545d6a]">Resurslar</h3>
            </Link>
            <Link to={'/'} className="rounded-[6px] w-[100%] flex gap-[7px] justify-start px-[20px] py-[10px] items-center bg-[#EBEFF3] relative">
                <h3 className="text-[#545d6a]">Sevimlilar</h3>
            </Link>
            {token && <Link to={'/'} className="rounded-[6px] w-[100%] flex gap-[7px] justify-start px-[20px] py-[10px] items-center bg-[#EBEFF3] relative">
                <h3 className="text-[#545d6a]">Navbatlar</h3>
            </Link>}
            </div>
        </div>}
        {openSidebar && <div onClick={handleClose} className="fixed top-0 left-0 bottom-0 bg-black/50 w-[100%] brightness-50 z-20"></div>}
        </div>
  )
}

export default HeaderSidebar