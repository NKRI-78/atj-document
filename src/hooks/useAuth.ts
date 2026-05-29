import { useAuthStore } from "@/store/auth.store"

export function useAuth() {
    const token =
        useAuthStore(
            (state) => state.token
        )

    const admin =
        useAuthStore(
            (state) => state.admin
        )

    const isAuthenticated =
        useAuthStore(
            (state) =>
                state.isAuthenticated
        )

    const setAuth =
        useAuthStore(
            (state) => state.setAuth
        )

    const logout =
        useAuthStore(
            (state) => state.logout
        )

    return {
        token,
        admin,
        isAuthenticated,
        setAuth,
        logout,
    }
}