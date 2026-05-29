import { create } from "zustand"

import Cookies from "js-cookie"

type Admin = {
    id: number
    username: string
}

type AuthState = {
    token: string | null

    admin: Admin | null

    isAuthenticated: boolean

    setAuth: (
        token: string,
        admin: Admin
    ) => void

    logout: () => void
}

export const useAuthStore =
    create<AuthState>((set) => ({
        //
        // INITIAL
        //
        token:
            Cookies.get("token") ||
            null,

        admin: localStorage.getItem(
            "admin"
        )
            ? JSON.parse(
                localStorage.getItem(
                    "admin"
                )!
            )
            : null,

        isAuthenticated:
            !!Cookies.get("token"),

        //
        // LOGIN
        //
        setAuth: (
            token,
            admin
        ) => {
            //
            // SAVE TOKEN
            //
            Cookies.set(
                "token",
                token,
                {
                    expires: 7,
                }
            )

            //
            // SAVE ADMIN
            //
            localStorage.setItem(
                "admin",
                JSON.stringify(admin)
            )

            //
            // STATE
            //
            set({
                token,
                admin,
                isAuthenticated: true,
            })
        },

        //
        // LOGOUT
        //
        logout: () => {
            Cookies.remove("token")

            localStorage.removeItem(
                "admin"
            )

            set({
                token: null,
                admin: null,
                isAuthenticated: false,
            })
        },
    }))