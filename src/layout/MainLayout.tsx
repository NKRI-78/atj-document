import { Outlet } from "react-router-dom"

import { useState } from "react"

import Header from "@/components/layout/Header"

import Sidebar from "@/components/layout/Sidebar"

import Footer from "@/components/layout/Footer"

export default function MainLayout() {
    const [
        sidebarOpen,
        setSidebarOpen,
    ] = useState(false)

    return (
        <div
            className="
                min-h-screen

                bg-[url('/images/bg-pattern.png')]
                bg-repeat
                bg-center
                bg-size-[500px]

                md:bg-size-[700px]

                relative
            "
        >
            {/* Overlay supaya background lebih soft */}
            <div
                className="
                    absolute inset-0
                    bg-white/80
                "
            />

            {/* CONTENT */}
            <div className="relative z-10 flex">
                {/* SIDEBAR */}
                <Sidebar
                    open={sidebarOpen}
                    onClose={() =>
                        setSidebarOpen(false)
                    }
                />

                {/* MAIN AREA */}
                <div
                    className="
                        flex-1
                        min-w-0
                        flex flex-col
                        min-h-screen
                    "
                >
                    {/* HEADER */}
                    <Header
                        onMenuClick={() =>
                            setSidebarOpen(true)
                        }
                    />

                    {/* CONTENT WRAPPER */}
                    <div
                        className="
                            flex-1
                            flex flex-col
                            min-h-[calc(100vh-80px)]
                        "
                    >
                        {/* CONTENT */}
                        <main
                            className="
                                flex-1
                                p-4 md:p-8
                                overflow-x-hidden
                            "
                        >
                            <Outlet />
                        </main>

                        {/* FOOTER */}
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}