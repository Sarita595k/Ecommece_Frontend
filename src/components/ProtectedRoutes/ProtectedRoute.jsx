import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children, isAuthenticated, user, loading }) => {
    // 1. Wait for Redux to finish loading the user info
    if (loading) return null;

    // 2. If not logged in, go to login
    if (isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    // 3. If it's an admin route but the user is NOT an admin, send them HOME
    if (isAdmin === true && user?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;