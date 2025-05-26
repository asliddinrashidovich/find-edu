import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Header() {
  return (
    <header className="bg-[#fff] px-5 md:px-10 py-[15px] fixed w-full z-99">
      <div className="flex items-center justify-between">
        <Link to={'/'} className="max-w-[200px]">
          <img src="/logo.png" alt="logo" />
        </Link>
        <ul className="flex gap-[20px] items-center">
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
        </ul>
        <div className="flex gap-[20px]">
           <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem defaultChecked value="uz">Uz</SelectItem>
                <SelectItem value="en">Eng</SelectItem>
                <SelectItem value="ru">Ru</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <button className="border-[1px] border-[#461773] text-[#461773] rounded-[30px] cursor-pointer px-[20px] py-[5px]">
            Kirish
          </button>
          <button className=" bg-[#461773] text-[#fff] rounded-[30px] cursor-pointer px-[20px] py-[5px]">
            Ro'yxatdan o'tish
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header