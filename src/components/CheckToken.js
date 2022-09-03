import { useAuth } from "./Context";
import { Navigate, Outlet } from 'react-router-dom';

function CheckToken() {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }
    return <Outlet />
}

export default CheckToken;
