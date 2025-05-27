import Footer from "@/components/main/footer"
import Header from "@/components/main/header"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <>
      <div>
        <Toaster position="top-right"/>
      </div>
      <Header/>   
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default MainLayout