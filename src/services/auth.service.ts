import { api } from "./api"

export const loginService =
    async (
        username: string,
        password: string
    ) => {
        const response =
            await api.post(
                "/api/admin/auth/login",
                {
                    username,
                    password,
                }
            )

        return response.data
    }