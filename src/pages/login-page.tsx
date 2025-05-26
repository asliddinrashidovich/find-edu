import LoginForm from "@/components/auth/login"

function LoginPage() {
  return (
   <div className='w-full h-[100vh] flex justify-center items-center px-[20px]'>
      <div className='bg-[#fff] px-[28px] py-[48px] rounded-[12px] shadow-2xl'>
        <LoginForm/>
      </div>
    </div>
  )
}

export default LoginPage