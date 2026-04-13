import { Route, Routes } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import ProductDetails from "./components/Products/ProductDetails"
import Login from "./components/User/Login"
import Register from "./components/User/Register"
import NavbarComp from "./components/Navbar/NavbarComp"

const App = () => {
  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App