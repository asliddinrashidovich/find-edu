import { MydataType } from "@/interfaces"
import { useState } from "react"
import { FaBarsStaggered } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import LanguageChanger from "../language/languageChanger"
import { MdEdit } from "react-icons/md"
import { IoLogOutOutline } from "react-icons/io5"
import { useTranslation } from "react-i18next"
import { getNavbarData } from "@/data/data"

function HeaderSidebar(myData: MydataType) {
    const [openSidebar, setOpenSideBar] = useState<boolean>(false)
    function handleOpen() {setOpenSideBar(true)}
    function handleClose() {setOpenSideBar(false)}
    const token = localStorage.getItem('token');
    const  navigate = useNavigate()
    const { t } = useTranslation();
    const NavbarData = getNavbarData(t);
    function handleClick(path: string) {
        navigate(path)
        setOpenSideBar(false)
    }
    console.log(myData)

    const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      window.location.reload()
    }
  return (
    <div className="lg:hidden flex">
        <button onClick={handleOpen} className="lg:hidden flex cursor-pointer">
            <FaBarsStaggered className="text-[#fff] text-[25px]"/>
        </button>
        {<div className={`fixed top-0 ${openSidebar ? "translate-x-0" : "translate-x-[100%]"} transition-liniar duration-200  right-0 bottom-0 bg-[#fff] w-[40%] z-30 `}>
            {token && <div className="w-full relative h-[200px] justify-center sm:h-[120px] bg-[#00000040] flex-col sm:flex-row flex md:hidden items-center gap-[20px] px-[20px]">
                <div className="max-w-[80px] max-h-[80px] rounded-full bg-[#fff]">
                    <img src={myData?.myData?.image} alt="" />
                </div>
                <div  >
                    <h3 className="text-[#461773] font-[600]">{myData?.myData?.firstName} {myData?.myData?.lastName}</h3>
                    <p className="text-[10px] text-[#888]">{myData?.myData?.email}</p>
                </div>
                <div className="cursor-pointer absolute top-[20px] right-[20px]">
                    <MdEdit className="text-[#ff5e00]"/>
                </div>
            </div>}
            {!token && <div className="flex md:hidden lg:flex-row flex-col gap-[20px] px-[20px] py-[20px] bg-[#00000040]">
                <button onClick={() => handleClick("/login")} className="border-[1px] w-full text-[12px] sm:text-[17px] lg:w-[50%] text-center border-[#461773] text-[#461773] rounded-[30px] cursor-pointer px-[20px] py-[5px]">
                    {t("authLogin")}
                </button>
                <button onClick={() => handleClick("/register")} className=" bg-[#461773] w-full text-[12px] sm:text-[17px] lg:w-[50%] text-center text-[#fff] rounded-[30px] cursor-pointer px-[20px] py-[5px]">
                    {t("authRegister")}
                </button>
            </div>}
            <div className="p-[20px] flex gap-[13px] flex-col">

            {NavbarData.map(item => (
                <h3 key={item.slug} onClick={() => handleClick(item.slug)} className="cursor-pointer rounded-[6px] text-[#545d6a] hover:bg-[#999] hover:text-[#fff] transition-all duration-200 w-[100%] text-[12px] md:text-[16px] flex gap-[7px] justify-start px-[5px] sm:px-[20px] py-[4px] md:py-[10px]  items-center bg-[#EBEFF3] relative">
                    {item.text} 
                </h3>
            ))}

            {token && <h3 onClick={() => handleClick("/appointment")}  className="cursor-pointer rounded-[6px] text-[#545d6a] hover:bg-[#999] hover:text-[#fff] w-[100%] text-[12px] md:text-[16px] flex gap-[7px] justify-start px-[5px] sm:px-[20px] py-[4px] md:py-[10px] items-center bg-[#EBEFF3] relative">
                {t('navbarAppointment')}
            </h3>}
            {myData?.myData?.role == 'CEO' && <h3 onClick={() => handleClick("/create-centers")}  className="cursor-pointer rounded-[6px] text-[#545d6a] hover:bg-[#999] hover:text-[#fff] w-[100%] text-[12px] md:text-[16px] flex gap-[7px] justify-start px-[5px] sm:px-[20px] py-[4px] md:py-[10px] items-center bg-[#d8d8d8] relative">
                {t('navbarCreateCenters')}
            </h3>}
            {myData?.myData?.role == 'CEO' && <h3 onClick={() => handleClick("/my-centers")}  className="cursor-pointer rounded-[6px] text-[#545d6a] hover:bg-[#999] hover:text-[#fff] w-[100%] text-[12px] md:text-[16px] flex gap-[7px] justify-start px-[5px] sm:px-[20px] py-[4px] md:py-[10px] items-center bg-[#d8d8d8] relative">
                {t('navbarMyCenters')}
            </h3>}
            {token && <h3 onClick={() => handleLogout()}  className="cursor-pointer rounded-[6px] text-[red] hover:bg-[#999] hover:text-[#fff] w-[100%] text-[12px] md:text-[16px] flex gap-[7px] justify-start px-[5px] sm:px-[20px] py-[4px] md:py-[10px] items-center bg-[#EBEFF3] relative">
                <IoLogOutOutline  className="text-[red]"/>
                {t('headerProfileDelete')}
            </h3>}
            </div>
            <div className="p-[20px] flex md:hidden">
                <LanguageChanger/>
            </div>
        </div>}
        {openSidebar && <div onClick={handleClose} className="fixed top-0 left-0 bottom-0 bg-black/50 w-[100%] brightness-50 z-20"></div>}
        </div>
  )
}

export default HeaderSidebar