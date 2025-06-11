import { Link } from "react-router-dom"

function AuthComponent() {
    const token = localStorage.getItem('token');
  return (
    <div>
        {!token && <div className="hidden md:flex gap-[7px] items-center">
              <Link to={'/login'} className="border-[1px] border-[#461773] text-[#461773] rounded-[30px] cursor-pointer px-[20px] py-[5px]">
                Kirish
              </Link>
              <Link to={'/register'} className=" bg-[#461773] text-[#fff] rounded-[30px] cursor-pointer px-[20px] py-[5px]">
                Ro'yxatdan o'tish
              </Link>
        </div>}
    </div>
  )
}

export default AuthComponent