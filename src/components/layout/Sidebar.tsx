import { Link, useLocation, useNavigate } from "react-router-dom"

import {
    Folder,
    LayoutDashboard,
    X,
    ChevronRight,
    LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import Logo from "../common/Logo"

type Props = {
    open?: boolean
    onClose?: () => void
}

export default function Sidebar({
    open,
    onClose,
}: Props) {
    const location = useLocation()

    const navigate = useNavigate()

    const {
        logout,
    } = useAuth()

    const [openLogout, setOpenLogout] =
        useState(false)

    const handleLogout = () => {
        logout()

        navigate("/")
    }

    const menus = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
            description:
                "Overview system",
        },

        {
            title: "My Files",
            icon: Folder,
            path: "/folders",
            description:
                "Kelola dokumen",
        },
    ]

    return (
        <>
            {/* OVERLAY */}
            <div
                onClick={onClose}
                className={cn(
                    `
                        fixed inset-0 z-40

                        bg-black/40
                        backdrop-blur-sm

                        transition-all duration-300

                        lg:hidden
                    `,
                    open
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                )}
            />

            {/* SIDEBAR */}
            <aside
                className={cn(
                    `
                        fixed lg:sticky
                        top-0 left-0
                        z-50

                        h-screen
                        w-72.5

                        border-r
                        border-border/50

                        bg-background/95
                        backdrop-blur-xl

                        flex flex-col

                        transition-transform duration-300

                        lg:translate-x-0
                    `,
                    open
                        ? "translate-x-0"
                        : "-translate-x-full"
                )}
            >
                {/* TOP */}
                <div
                    className="
                        h-20

                        border-b
                        border-border/50

                        px-6

                        flex items-center justify-between
                    "
                >
                    {/* BRAND */}
                    <div className="flex items-center gap-4">
                        {/* LOGO */}
                        <Logo size={60} />

                        {/* DESKTOP */}
                        <div className="hidden lg:block">
                            <h1
                                className="
                                    text-lg
                                    font-bold
                                    tracking-tight
                                "
                            >
                                Docs
                            </h1>

                            <p
                                className="
                                    text-xs
                                    text-muted-foreground
                                    mt-1
                                "
                            >
                                Kelola dokumen
                                organisasi
                            </p>
                        </div>
                    </div>

                    {/* CLOSE */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="
                            lg:hidden
                            rounded-2xl
                        "
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* MENU */}
                <div
                    className="
                        flex-1
                        p-4
                        space-y-2
                    "
                >
                    {menus.map((menu) => {
                        const Icon =
                            menu.icon

                        const isActive =
                            location.pathname ===
                            menu.path

                        return (
                            <Link
                                key={menu.title}
                                to={menu.path}
                                onClick={onClose}
                            >
                                <div
                                    className={cn(
                                        `
                            group
                            my-3
                            flex items-center
                            gap-4

                            rounded-2xl

                            px-4
                            py-3.5

                            transition-all duration-200

                            border border-transparent
                        `,
                                        isActive
                                            ? `
                                bg-black
                                text-white

                                shadow-lg
                            `
                                            : `
                                hover:bg-zinc-100
                            `
                                    )}
                                >
                                    {/* ICON */}
                                    <div
                                        className={cn(
                                            `
                                w-11 h-11

                                rounded-xl

                                flex items-center justify-center

                                transition-all duration-200
                            `,
                                            isActive
                                                ? `
                                    bg-white/10
                                `
                                                : `
                                    bg-zinc-100
                                    group-hover:bg-white
                                `
                                        )}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    {/* TEXT */}
                                    <div className="flex-1">
                                        <p
                                            className="
                                font-semibold
                                text-sm
                            "
                                        >
                                            {menu.title}
                                        </p>

                                        <p
                                            className={cn(
                                                `
                                    text-xs
                                    mt-1
                                `,
                                                isActive
                                                    ? `
                                        text-white/70
                                    `
                                                    : `
                                        text-muted-foreground
                                    `
                                            )}
                                        >
                                            {
                                                menu.description
                                            }
                                        </p>
                                    </div>

                                    {/* ARROW */}
                                    <ChevronRight
                                        className={cn(
                                            `
                                w-4 h-4

                                transition-all duration-200
                            `,
                                            isActive
                                                ? `
                                    opacity-100
                                `
                                                : `
                                    opacity-0
                                    translate-x-1

                                    group-hover:opacity-100
                                    group-hover:translate-x-0
                                `
                                        )}
                                    />
                                </div>
                            </Link>
                        )
                    })}
                </div>
                {/* FOOTER */}
                <div
                    className="
        border-t
        border-border/50

        p-4
    "
                >
                    <div
                        className="
            rounded-2xl

            bg-muted/50

            p-4

            space-y-4
        "
                    >
                        {/* INFO */}
                        <div>
                            <p
                                className="
                    text-sm
                    font-semibold
                "
                            >
                                ATJ Workspace
                            </p>

                            <p
                                className="
                    text-xs
                    text-muted-foreground

                    mt-2
                    leading-relaxed
                "
                            >
                                Sistem manajemen
                                dokumen organisasi.
                            </p>
                        </div>

                        {/* LOGOUT */}
                        <Button
                            variant="outline"
                            className="
                w-full

                rounded-xl

                justify-start

                text-red-500

                hover:text-red-500
            "
                            onClick={() =>
                                setOpenLogout(
                                    true
                                )
                            }
                        >
                            <LogOut className="w-4 h-4 mr-2" />

                            Logout
                        </Button>
                    </div>
                </div>

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
            </aside>
        </>
    )
}