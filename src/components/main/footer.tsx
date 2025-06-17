import { useTranslation } from "react-i18next";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa"
import { SlSocialFacebook } from "react-icons/sl"
import { Link } from "react-router-dom"

function Footer() {
    const { t } = useTranslation();

  return (
    <footer className="px-5 md:px-10 py-[20px] bg-[#451774]">
        <div className="max-w-[1200px] mx-auto">
            <Link to={'/'} className="px-[20px] py-[5px] rounded-[5px] bg-[#fff] flex items-center max-w-[200px] mb-[30px]">
                <img src="/logo.png" alt="logo" />
            </Link>
            <div className="mx-[20px] flex flex-col justify-start md:flex-row gap-[50px] mb-[50px]">
                <div className="flex  sm:w-[400px] sm:mr-auto sm:ml-auto  md:mr-[0] md:ml-[0]  md:w-[300px] justify-between">
                    <ul className="flex flex-col gap-5">
                        <li className="text-[#fff] hover:text-[#888] transition-all duration-200 text-[18px]">
                            <Link to={'/'}>{t("footerHome")}</Link>
                        </li>
                        <li className="text-[#fff] hover:text-[#888] transition-all duration-200 text-[18px]">
                            <Link to={'/'}>{t("footerCenters")}</Link>
                        </li>
                        <li className="text-[#fff] hover:text-[#888] transition-all duration-200 text-[18px]">
                            <Link to={'/about'}>{t("footerAbout")}</Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-5">
                        <li className="text-[#fff] hover:text-[#888] transition-all duration-200 text-[18px]">
                            <Link to={'#'}>{t("footerAloqa")}</Link>
                        </li>
                        <li className="text-[#fff] hover:text-[#888] transition-all duration-200 text-[18px]">
                            <Link to={'#'}>{t("footerSharhlar")}</Link>
                        </li>
                        <li className="text-[#fff] hover:text-[#888] transition-all duration-200 text-[18px]">
                            <Link to={'#'}>{t("footerLoyihalar")}</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex  sm:w-[400px] sm:mr-auto sm:ml-auto  md:mr-auto md:ml-[0]  md:w-[300px] justify-between">
                    <ul className="flex flex-col gap-5">
                        <li className="text-[#888] hover:text-[#fff] transition-all duration-200">
                            <Link to={'#'} className="text-[16px] font-[400]">{t("footerIt")}</Link>
                        </li>
                        <li className="text-[#888]  hover:text-[#fff] transition-all duration-200">
                            <Link to={'#'} className="text-[16px] font-[400]">{t("footerMatem")}</Link>
                        </li>
                        <li className="text-[#888]  hover:text-[#fff] transition-all duration-200">
                            <Link to={'#'} className="text-[16px] font-[400]">{t("footerMarketing")}</Link>
                        </li>
                        <li className="text-[#888]  hover:text-[#fff] transition-all duration-200">
                            <Link to={'#'} className="text-[16px] font-[400]">{t("footerSat")}</Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-5">
                        <li className="text-[#888]  hover:text-[#fff] transition-all duration-200">
                            <Link to={'#'} className="text-[16px] font-[400]">{t("footerEnglish")}</Link>
                        </li>
                        <li className="text-[#888]  hover:text-[#fff] transition-all duration-200">
                            <Link to={'#'} className="text-[16px] font-[400]">{t("footerSmm")}</Link>
                        </li>
                        <li className="text-[#888]  hover:text-[#fff] transition-all duration-200">
                            <Link to={'#'} className="text-[16px] font-[400]">{t("footerDesign")}</Link>
                        </li>
                        <li className="text-[#888]  hover:text-[#fff] transition-all duration-200">
                            <Link to={'#'} className="text-[16px] font-[400]">{t("footerBiznes")}</Link>
                        </li>
                    </ul>
                </div>
            </div>  
            <div className="flex sm:flex-row flex-col-reverse gap-[20px] sm:gap-[0px] justify-between items-center">
                <p className="text-[15px] text-[#888]">{t("footerFooter")}</p>
                <div className="flex  gap-[20px] items-center">
                    <Link to={'https://www.facebook.com/confirmemail.php?next=https%3A%2F%2Fwww.facebook.com%2F#'}><SlSocialFacebook className="text-[#888] hover:text-[#fff] transition-all duration-200 text-[30px]"/></Link>
                    <Link to={'https://www.instagram.com'}><FaInstagram className="text-[#888] hover:text-[#fff] transition-all duration-200 text-[30px]"/></Link>
                    <Link to={'https://web.telegram.org'}><FaTelegramPlane className="text-[#888] hover:text-[#fff] transition-all duration-200 text-[30px]"/></Link>
                    <Link to={'https://www.youtube.com'}><FaYoutube className="text-[#888] hover:text-[#fff] transition-all duration-200 text-[30px]"/></Link>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer