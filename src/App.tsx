import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/main-layout"
import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
import RegisterPage from "./pages/register-page"
import VerifyRegisterOtp from "./pages/verify-register-otp"

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="register/verify-otp" element={<VerifyRegisterOtp/>}/>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App