import { Card } from "antd";
import { PiBuildingOfficeBold, PiStudentBold } from "react-icons/pi";
import { FaTrophy } from "react-icons/fa";
import { NumberTicker } from "../magicui/number-ticker";

function AboutResults() {
  return (
    <div className="px-5 md:px-10 py-[40px]">
        <h2 className="text-[50px] text-center font-[600] text-[#461773] mb-[40px]">Bizning ta'sirimiz</h2>
        <div className="flex flex-col md:flex-row items-center gap-[30px] justify-center">
            <Card  className="max-w-[300px] md:max-w-full w-full md:w-[280px] text-center h-[230px] p-0 shadow-xl rounded-[20px] flex flex-col justify-start items-center">
                <div className="flex flex-col justify-start items-center">
                    <PiStudentBold  className="text-[50px] text-[#461773]"/>
                    <h2 className="text-[40px] font-[700]">
                        <NumberTicker
                            value={250}
                        />+
                    </h2>
                    <p className="text-[18px] text-[#666]">Ro'yxatdan o'tgan foydalanuvchilar</p>
                </div>
            </Card>
            <Card  className="max-w-[300px] md:max-w-full w-full md:w-[280px] text-center h-[230px] p-0 shadow-xl rounded-[20px] flex flex-col justify-start items-center">
                <div className="flex flex-col justify-start items-center">
                    <PiBuildingOfficeBold   className="text-[50px] text-[#461773]"/>
                    <h2 className="text-[40px] font-[700]">
                        <NumberTicker
                            value={120}
                        />+
                    </h2>
                    <p className="text-[18px] text-[#666]">Ta'lim markazlari</p>
                </div>
            </Card>
            <Card  className="max-w-[300px] md:max-w-full w-full md:w-[280px] text-center h-[230px] p-0 shadow-xl rounded-[20px] flex flex-col justify-start items-center">
                <div className="flex flex-col justify-start items-center">
                    <FaTrophy  className="text-[50px] text-[#461773]"/>
                    <h2 className="text-[40px] font-[700]">
                        <NumberTicker
                            value={80}
                        />+
                    </h2>
                    <p className="text-[18px] text-[#666]">Muvaffaqiyat hikoyalari</p>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default AboutResults