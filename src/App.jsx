import { Route, Routes } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import ProductDetails from "./components/Products/ProductDetails"
import Login from "./components/User/Login"
import Register from "./components/User/Register"
import NavbarComp from "./components/Navbar/NavbarComp"
import AdminUsers from "./components/Admin/AdminUsers"
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute"
import { loadUser } from "./Actions/UsersActions";
import { useSelector } from "react-redux"
import { useEffect } from "react"
import store from "./components/Store/store"
const App = () => {
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);
  useEffect(() => {
    // This checks the backend (/api/me) to see if we are still logged in
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin Only Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}>
              <AdminUsers />
            </ProtectedRoute>
          } />

        <Route path="/register" element={<Register />} />
      </Routes >
    </>
  )
}

export default App