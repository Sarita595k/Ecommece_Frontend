import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "./Actions/UsersActions"

import LandingPage from "./Pages/LandingPage"
import ProductDetails from "./components/Products/ProductDetails"
import Login from "./components/User/Login"
import Register from "./components/User/Register"
import NavbarComp from "./components/Navbar/NavbarComp"
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute"
import SellerDashboard from "./components/Seller/SellerDashboard"
import ProductForm from "./components/Products/ProductForm"

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Core Seller Dashboard Landing Hub */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute isSeller={true} isAuthenticated={isAuthenticated} loading={loading} user={user}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Seller Upload Product Form Path */}
        <Route
          path="/seller/product/new"
          element={
            <ProtectedRoute isSeller={true} isAuthenticated={isAuthenticated} loading={loading} user={user}>
              <ProductForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App;