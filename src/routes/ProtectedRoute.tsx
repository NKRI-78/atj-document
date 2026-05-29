// ProtectedRoute.tsx

import {
    Navigate,
    Outlet,
} from "react-router-dom"

import { useAuth } from "@/hooks/useAuth"

export default function ProtectedRoute() {
    const {
        token,
        isAuthenticated,
    } = useAuth()

    //
    // NOT LOGIN
    //
    if (
        !token ||
        !isAuthenticated
    ) {
        return (
            <Navigate
                to="/"
                replace
            />
        )
    }

    //
    // LOGIN
    //
    return <Outlet />
}