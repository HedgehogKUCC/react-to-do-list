import { useAuth } from "./Context";
import { Navigate, Outlet } from 'react-router-dom';

function ProtectRoute() {
    const { token } = useAuth();
    if (token) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />
}

export default ProtectRoute;
