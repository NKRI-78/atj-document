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
                bg-muted/30
            "
        >
            <div className="flex">
                {/* SIDEBAR */}
                <Sidebar
                    open={sidebarOpen}
                    onClose={() =>
                        setSidebarOpen(
                            false
                        )
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
                            setSidebarOpen(
                                true
                            )
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