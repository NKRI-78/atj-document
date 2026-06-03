import { Link, useNavigate } from "react-router-dom"

import {
    Upload,
    Menu,
    LogOut,
    ChevronDown,
} from "lucide-react"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"

import { useAuth } from "@/hooks/useAuth"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Swal from "sweetalert2"

type Props = {
    onMenuClick?: () => void
}

export default function Header({
    onMenuClick,
}: Props) {
    const navigate = useNavigate()

    const {
        admin,
        logout,
    } = useAuth()

    const [
        openLogout,
        setOpenLogout,
    ] = useState(false)

    const handleLogout = async () => {
        logout()

        await Swal.fire({
            icon: "success",

            title:
                "Berhasil Logout",

            text: `Sampai jumpa lagi...`,

            timer: 1500,

            showConfirmButton: false,
        })

        navigate("/")

    }

    return (
        <>
            <header
                className="
                    sticky top-0 z-30

                    h-20

                    border-b
                    border-border/50

                    bg-background/70
                    backdrop-blur-xl
                "
            >
                <div
                    className="
                        h-full

                        flex items-center justify-between

                        px-4 md:px-8
                    "
                >
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                        {/* MOBILE MENU */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="
                                lg:hidden
                                rounded-2xl
                            "
                            onClick={onMenuClick}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>

                        {/* MOBILE BRAND */}
                        <div className="lg:hidden">
                            <h1
                                className="
                                    text-lg
                                    font-bold
                                    tracking-tight
                                "
                            >
                                ATJ Docs
                            </h1>

                            <p
                                className="
                                    text-xs
                                    text-muted-foreground
                                    mt-0.5
                                "
                            >
                                Kelola dokumen
                                organisasi
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3">
                        {/* UPLOAD */}
                        <Link to="/upload">
                            <Button
                                className="
                                    rounded-2xl
                                    h-11
                                    px-5

                                    shadow-sm
                                "
                            >
                                <Upload className="w-4 h-4 mr-2" />

                                <span className="hidden sm:block">
                                    Upload
                                </span>
                            </Button>
                        </Link>

                        {/* PROFILE */}
                        {/* PROFILE */}
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                            >
                                <Button
                                    variant="ghost"
                                    className="
                h-11

                rounded-2xl

                px-2 md:px-3

                gap-3

                hover:bg-muted
            "
                                >
                                    {/* AVATAR */}
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback
                                            className="
                        bg-black
                        text-white
                        text-sm
                        font-semibold
                    "
                                        >
                                            {admin?.username?.charAt(
                                                0
                                            )}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* USERNAME */}
                                    <span
                                        className="
                    hidden md:block

                    text-sm
                    font-semibold
                "
                                    >
                                        {admin?.username}
                                    </span>

                                    {/* CHEVRON */}
                                    <ChevronDown
                                        className="
                    hidden md:block

                    w-4 h-4

                    text-muted-foreground
                "
                                    />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="
            w-56

            rounded-2xl
        "
                            >
                                {/* HEADER */}
                                <div className="px-2 py-2">
                                    <p
                                        className="
                    text-sm
                    font-semibold
                "
                                    >
                                        {admin?.username}
                                    </p>

                                    <p
                                        className="
                    text-xs
                    text-muted-foreground
                    mt-1
                "
                                    >
                                        Administrator
                                    </p>
                                </div>

                                <DropdownMenuSeparator />

                                {/* LOGOUT */}
                                <DropdownMenuItem
                                    onClick={() =>
                                        setOpenLogout(
                                            true
                                        )
                                    }
                                    className="
                cursor-pointer

                text-red-500
                focus:text-red-500

                rounded-xl
                mx-1
            "
                                >
                                    <LogOut className="w-4 h-4 mr-2" />

                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            {/* LOGOUT DIALOG */}
            <Dialog
                open={openLogout}
                onOpenChange={
                    setOpenLogout
                }
            >
                <DialogContent className="rounded-3xl">
                    <DialogHeader>
                        <DialogTitle>
                            Logout
                        </DialogTitle>

                        <DialogDescription>
                            Yakin ingin keluar
                            dari akun?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-3">
                        <Button
                            variant="outline"
                            className="rounded-xl"
                            onClick={() =>
                                setOpenLogout(
                                    false
                                )
                            }
                        >
                            Batal
                        </Button>

                        <Button
                            className="
                    rounded-xl

                    bg-red-500
                    hover:bg-red-600
                "
                            onClick={
                                handleLogout
                            }
                        >
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}