import { useEffect, useState } from "react"

import Swal from "sweetalert2"

import { z } from "zod"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import {
    Lock,
    ArrowRight,
    User,
    Copyright,
} from "lucide-react"

import { logger } from "@/lib/logger"

import { loginService } from "@/services/auth.service"

import { useAuth } from "@/hooks/useAuth"
import Logo from "@/components/common/Logo"



// =======================
// VALIDATION
// =======================

const loginSchema = z.object({
    username: z
        .string()
        .min(
            1,
            "Username wajib diisi"
        ),

    password: z
        .string()
        .min(
            6,
            "Password minimal 6 karakter"
        ),
})

type LoginFormData = z.infer<
    typeof loginSchema
>



// =======================
// COMPONENT
// =======================

export default function Login() {
    const navigate = useNavigate()

    const [loading, setLoading] =
        useState(false)

    const {
        setAuth,
        isAuthenticated,
    } = useAuth()

    //
    // REACT HOOK FORM
    //
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<LoginFormData>({
        resolver:
            zodResolver(
                loginSchema
            ),

        mode: "onChange",
    })



    // =======================
    // REDIRECT IF LOGIN
    // =======================

    useEffect(() => {
        if (isAuthenticated) {
            navigate(
                "/dashboard"
            )
        }
    }, [
        isAuthenticated,
        navigate,
    ])



    // =======================
    // SUBMIT LOGIN
    // =======================

    const onSubmit = async (
        values: LoginFormData
    ) => {
        try {
            //
            // START LOADING
            //
            setLoading(true)

            logger.info(
                "LOGIN PAYLOAD",
                values
            )

            //
            // API
            //
            const response =
                await loginService(
                    values.username,
                    values.password
                )

            //
            // RESPONSE
            //
            const token =
                response.data.token

            const admin =
                response.data.admin

            //
            // SAVE AUTH
            //
            setAuth(
                token,
                admin
            )

            //
            // SUCCESS
            //
            await Swal.fire({
                icon: "success",

                title:
                    "Login Success",

                text: `Selamat datang kembali ${admin.username}`,

                timer: 1500,

                showConfirmButton: false,
            })

            //
            // REDIRECT
            //
            navigate(
                "/dashboard"
            )
        } catch (error: any) {
            logger.error(
                "LOGIN ERROR",
                error
            )

            //
            // ERROR MESSAGE
            //
            const message =
                error?.response?.data
                    ?.message ||
                "Login failed"

            //
            // ALERT
            //
            Swal.fire({
                icon: "error",

                title:
                    "Login Failed",

                text: message,
            })
        } finally {
            //
            // STOP LOADING
            //
            setLoading(false)
        }
    }



    return (
        <div className="min-h-screen bg-slate-100 grid lg:grid-cols-2">

            {/* LEFT */}
            {/* LEFT */}
            <div
                className="
        hidden lg:flex

        relative

        overflow-hidden
    "
            >
                {/* BG IMAGE */}
                <div
                    className="
            absolute inset-0

            bg-[url('/images/bg-login.png')]

            bg-cover
            bg-center
            bg-no-repeat
        "
                />

                {/* OVERLAY */}
                <div
                    className="
            absolute inset-0

        "
                />

                {/* CONTENT */}
                <div
                    className="
            relative z-10

            flex flex-col justify-between

            w-full

            p-14

            text-white
        "
                >
                    <div>
                        {/* LOGO */}
                        <div className="flex items-center gap-4">
                            <Logo />

                            <div>
                                <h1 className="font-bold text-xl">
                                    Asosiasi Tiger Jakarta
                                </h1>

                                <p className="text-slate-300 text-sm">
                                    Sistem Administrasi Internal
                                </p>
                            </div>
                        </div>

                        {/* HERO */}
                        <div className="mt-24 max-w-xl">
                            <p className="text-primary font-medium mb-3">
                                Selamat Datang
                            </p>

                            <h2 className="text-5xl font-bold leading-tight">
                                Kelola Dokumen &
                                Administrasi Dengan Mudah
                            </h2>

                            <p className="mt-6 text-slate-200 leading-relaxed text-lg">
                                Platform internal untuk membantu
                                pengelolaan dokumen, arsip,
                                dan administrasi organisasi
                                secara lebih modern dan efisien.
                            </p>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center gap-1 text-sm text-slate-300">
                        <Copyright className="h-4 w-4" />

                        <span>
                            {new Date().getFullYear()} Asosiasi Tiger Jakarta
                        </span>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div
                className="
        relative

        flex
        items-center
        justify-center

        p-6

        overflow-hidden
    "
            >
                {/* DESKTOP PATTERN */}
                <div
                    className="
            hidden lg:block

            absolute inset-0

            bg-[url('/images/bg-pattern.png')]
            bg-repeat
            bg-center

            bg-size-[220px]
            xl:bg-size-[260px]
        "
                />

                {/* DESKTOP WHITE OVERLAY */}
                <div
                    className="
            hidden lg:block

            absolute inset-0

            bg-white/80
        "
                />

                {/* MOBILE BG */}
                <div
                    className="
            lg:hidden

            absolute inset-0

            bg-[url('/images/bg-login.png')]

            bg-cover
            bg-center
            bg-no-repeat
        "
                />

                {/* MOBILE OVERLAY */}
                <div
                    className="
            lg:hidden

            absolute inset-0
        "
                />

                {/* LOGIN CARD */}
                <div
                    className="
            relative z-10

            w-full max-w-md

            rounded-3xl

            border border-white/20

            bg-white/92

            shadow-2xl

            backdrop-blur-sm

            p-8
        "
                >

                    {/* MOBILE LOGO */}
                    <div className="lg:hidden mb-10">
                        <div className="flex items-center gap-3">
                            <Logo />

                            <div>
                                <h1 className="font-bold text-lg">
                                    Asosiasi Tiger Jakarta
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Sistem Administrasi
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* HEADER */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Login Admin
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Silakan masuk menggunakan akun Anda
                        </p>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        {/* USERNAME */}
                        <div className="space-y-2">
                            <Label>
                                Username
                            </Label>

                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                                <Input
                                    type="text"
                                    placeholder="Masukkan username"
                                    className="
                            pl-10
                            h-12
                            rounded-xl
                            border-slate-300
                        "
                                    {...register("username")}
                                />
                            </div>

                            {errors.username && (
                                <p className="text-sm text-red-500">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-2">
                            <Label>
                                Password
                            </Label>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                                <Input
                                    type="password"
                                    placeholder="Masukkan password"
                                    className="
                            pl-10
                            h-12
                            rounded-xl
                            border-slate-300
                        "
                                    {...register("password")}
                                />
                            </div>

                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* BUTTON */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="
                    w-full
                    h-12
                    rounded-xl
                    text-base
                    font-medium
                "
                        >
                            {loading
                                ? "Sedang Masuk..."
                                : "Masuk"}

                            {!loading && (
                                <ArrowRight className="ml-2 h-4 w-4" />
                            )}
                        </Button>
                    </form>

                    {/* MOBILE FOOTER */}
                    <div className="lg:hidden mt-10 flex items-center justify-center gap-1 text-center text-xs text-slate-500">
                        <Copyright className="h-3 w-3" />

                        <span>
                            {new Date().getFullYear()} Asosiasi Tiger Jakarta
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}