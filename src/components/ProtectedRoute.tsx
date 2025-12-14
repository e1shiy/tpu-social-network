import {useStore} from "../store/store.ts";
import redirectToExternalAuth from "../services/authService.ts";
import {Outlet} from "react-router-dom";

function ProtectedRoute() {
    const { accessToken } = useStore()
    if (accessToken) return <Outlet/>
    else redirectToExternalAuth()
}
export default ProtectedRoute;
