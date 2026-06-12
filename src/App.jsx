import { Route, Routes } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import ProductDetails from "./components/Products/ProductDetails"
import Login from "./components/User/Login"
import Register from "./components/User/Register"
import NavbarComp from "./components/Navbar/NavbarComp"
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute"
import SellerDashboard from "./components/Seller/SellerDashboard"
import ProductForm from "./components/Products/ProductForm"
import { useSelector } from "react-redux"

const App = () => {
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Seller Dashboard Route */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Seller Upload Route */}
        <Route
          path="/seller/product/new"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}>
              <ProductForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App;