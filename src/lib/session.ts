// src/lib/session.ts
import Cookies from "js-cookie"

const SESSION_KEY = "atj_session"

export interface SessionData {
    token: string
    user: {
        id: number
        name: string
        email: string
    }
}

export const saveSession = (data: SessionData) => {
    Cookies.set(SESSION_KEY, JSON.stringify(data), {
        expires: 7,
        secure: true,
        sameSite: "strict",
    })
}

export const getSession = (): SessionData | null => {
    const session = Cookies.get(SESSION_KEY)

    if (!session) return null

    try {
        return JSON.parse(session)
    } catch {
        return null
    }
}

export const removeSession = () => {
    Cookies.remove(SESSION_KEY)
}