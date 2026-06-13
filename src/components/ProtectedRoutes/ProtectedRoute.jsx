import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isSeller, children, isAuthenticated, user, loading }) => {
    // 1. Wait for Redux to finish loading the user info out of cookies
    if (loading) return <div className="text-white text-center mt-20">Verifying session...</div>;

    // 2. If not logged in, boot to login page
    if (isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    // 3. If it's a seller route but the user is NOT a seller, send them HOME
    if (isSeller === true && user?.role?.toLowerCase() !== "seller") {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;