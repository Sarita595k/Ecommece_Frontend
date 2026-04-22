import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children, isAuthenticated }) => {
    // If not logged in, go to login
    if (isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    // If logged in but NOT an admin, go to home or profile
    if (isAdmin === true && user.role !== "admin") {
        return <Navigate to="/me" />;
    }

    return children;
};

export default ProtectedRoute