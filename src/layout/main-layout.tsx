import Footer from "@/components/main/footer"
import Header from "@/components/main/header"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <>
      <Header/>   
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default MainLayout