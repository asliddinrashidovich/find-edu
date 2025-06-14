import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/main-layout"
import { AboutPage, BranchDetailsPage, CenterDetails, CreateCenter, FavoritePage, HomePage, LoginPage, MyCentersPage, NotFoundPage, ProfilePage, QueePage, RegisterPage, Resources, VerifyRegisterOtp } from "./pages"

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="register/verify-otp" element={<VerifyRegisterOtp/>}/>
        <Route path="profile" element={<ProfilePage/>}/>
        <Route path="appointment" element={<QueePage/>}/>
        <Route path="create-centers" element={<CreateCenter/>}/>
        <Route path="my-centers" element={<MyCentersPage/>}/>
        <Route path="resources" element={<Resources/>}/>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="favorites" element={<FavoritePage/>}/>
        <Route path="branches/:id" element={<BranchDetailsPage/>}/>
        <Route path="centers/:id" element={<CenterDetails/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
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