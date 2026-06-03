import { useEffect, useState } from "react"

import axios from "axios"

import {
    useNavigate,
} from "react-router-dom"

import { Card, CardContent } from "@/components/ui/card"

const getFileExtension = (
    type: string,
    name: string
) => {
    //
    // PRIORITAS DARI NAMA FILE
    //
    const extension =
        name.split(".").pop()

    if (extension) {
        return extension.toUpperCase()
    }

    //
    // FALLBACK MIME TYPE
    //
    return (
        type.split("/")[1] ||
        "FILE"
    ).toUpperCase()
}

import {
    FileText,
    ImageIcon,
    Video,
    Folder,
} from "lucide-react"
import { BASE_URL } from "@/utils/constant"

type DashboardResponse = {
    stats: {
        documents: number
        images: number
        videos: number
        total_files: number
    }

    recent_files: {
        id: number

        name: string

        category: string

        file_type: string

        size: number

        size_label: string

        gcs_path: string

        parent_folder: string

        folder_name: string

        created_at: string

        status_label: string
    }[]
}

export default function Dashboard() {
    const navigate =
        useNavigate()

    const [loading, setLoading] =
        useState(true)

    const [dashboard, setDashboard] =
        useState<DashboardResponse | null>(
            null
        )

    //
    // FETCH DASHBOARD
    //
    const fetchDashboard =
        async () => {
            try {
                setLoading(true)

                const response =
                    await axios.get(
                        `${BASE_URL}/api/dashboard?limit=4`
                    )

                setDashboard(
                    response.data.data
                )
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

    useEffect(() => {
        fetchDashboard()
    }, [])

    //
    // STATS
    //
    const stats = [
        {
            title: "Dokumen",

            total:
                dashboard?.stats
                    .documents || 0,

            icon: FileText,
        },

        {
            title: "Gambar",

            total:
                dashboard?.stats
                    .images || 0,

            icon: ImageIcon,
        },

        {
            title: "Video",

            total:
                dashboard?.stats
                    .videos || 0,

            icon: Video,
        },

        {
            title: "Total File",

            total:
                dashboard?.stats
                    .total_files || 0,

            icon: Folder,
        },
    ]

    //
    // FILE ICON
    //
    const getFileIcon = (
        category: string
    ) => {
        switch (
        category.toLowerCase()
        ) {
            case "image":
                return (
                    <ImageIcon className="w-5 h-5" />
                )

            case "video":
                return (
                    <Video className="w-5 h-5" />
                )

            default:
                return (
                    <FileText className="w-5 h-5" />
                )
        }
    }

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div>
                <h1
                    className="
                        text-2xl md:text-3xl
                        font-bold
                        tracking-tight
                    "
                >
                    Dashboard
                </h1>

                <p
                    className="
                        text-muted-foreground
                        mt-2
                    "
                >
                    Ringkasan file dan
                    dokumen organisasi
                </p>
            </div>

            {/* STATS */}
            <div
                className="
                    grid

                    grid-cols-2
                    xl:grid-cols-4

                    gap-4
                "
            >
                {stats.map((item) => {
                    const Icon =
                        item.icon

                    return (
                        <Card
                            key={item.title}
                            className="
                                rounded-3xl

                                border

                                shadow-none

                                hover:shadow-md

                                transition-all duration-200
                            "
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    {/* LEFT */}
                                    <div>
                                        <p
                                            className="
                                                text-sm
                                                text-muted-foreground
                                            "
                                        >
                                            {
                                                item.title
                                            }
                                        </p>

                                        <h2
                                            className="
                                                text-3xl
                                                font-bold

                                                mt-2
                                            "
                                        >
                                            {
                                                item.total
                                            }
                                        </h2>

                                        <p
                                            className="
                                                text-xs
                                                text-muted-foreground
                                                mt-1
                                            "
                                        >
                                            Total
                                            file
                                        </p>
                                    </div>

                                    {/* ICON */}
                                    <div
                                        className="
                                            w-14 h-14

                                            rounded-2xl

                                            bg-red-500
                                            text-white

                                            flex items-center justify-center
                                        "
                                    >
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* FILE TERBARU */}
            <section className="space-y-5">
                {/* TITLE */}
                <div>
                    <h2
                        className="
                            text-xl
                            font-semibold
                        "
                    >
                        File Terbaru
                    </h2>

                    <p
                        className="
                            text-sm
                            text-muted-foreground
                            mt-1
                        "
                    >
                        File yang baru
                        ditambahkan
                    </p>
                </div>

                {/* LOADING */}
                {loading && (
                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-4
                        "
                    >
                        {Array.from({
                            length: 4,
                        }).map((_, i) => (
                            <Card
                                key={i}
                                className="
                                    rounded-3xl
                                "
                            >
                                <CardContent className="p-5">
                                    <div className="animate-pulse flex items-center gap-4">
                                        <div
                                            className="
                                                w-14 h-14
                                                rounded-2xl
                                                bg-muted
                                            "
                                        />

                                        <div className="flex-1 space-y-3">
                                            <div
                                                className="
                                                    h-4
                                                    bg-muted
                                                    rounded-full
                                                "
                                            />

                                            <div
                                                className="
                                                    h-3
                                                    w-24
                                                    bg-muted
                                                    rounded-full
                                                "
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* EMPTY */}
                {!loading &&
                    dashboard
                        ?.recent_files
                        .length ===
                    0 && (
                        <Card className="rounded-3xl">
                            <CardContent
                                className="
                                    p-10

                                    text-center
                                "
                            >
                                <Folder className="w-12 h-12 mx-auto text-muted-foreground" />

                                <h3
                                    className="
                                        mt-5
                                        text-lg
                                        font-semibold
                                    "
                                >
                                    Belum Ada
                                    File
                                </h3>

                                <p
                                    className="
                                        text-sm
                                        text-muted-foreground

                                        mt-2
                                    "
                                >
                                    File terbaru
                                    akan muncul
                                    di sini
                                </p>
                            </CardContent>
                        </Card>
                    )}

                {/* FILE LIST */}
                {!loading &&
                    dashboard
                        ?.recent_files
                        .length! > 0 && (
                        <div
                            className="
                                grid

                                grid-cols-1
                                md:grid-cols-2

                                gap-4
                            "
                        >
                            {dashboard?.recent_files.map(
                                (
                                    file
                                ) => {
                                    //
                                    // URL FOLDER
                                    //
                                    const folderUrl =
                                        `/folders/${file.parent_folder}/${file.folder_name}`

                                    //
                                    // EXTENSION
                                    //

                                    return (
                                        <Card
                                            key={
                                                file.id
                                            }
                                            onClick={() =>
                                                navigate(
                                                    folderUrl
                                                )
                                            }
                                            className="
                                                rounded-3xl

                                                border

                                                shadow-none

                                                hover:shadow-md
                                                hover:-translate-y-1

                                                transition-all duration-200

                                                cursor-pointer
                                            "
                                        >
                                            <CardContent className="p-5">
                                                <div className="flex items-start gap-4">
                                                    {/* ICON */}
                                                    <div
                                                        className="
                                                            w-14 h-14

                                                            rounded-2xl

                                                            bg-muted

                                                            flex items-center justify-center

                                                            shrink-0
                                                        "
                                                    >
                                                        {getFileIcon(
                                                            file.category
                                                        )}
                                                    </div>

                                                    {/* CONTENT */}
                                                    <div className="flex-1 min-w-0">
                                                        {/* NAME */}
                                                        <h3
                                                            className="
                                                                font-semibold

                                                                line-clamp-1
                                                            "
                                                        >
                                                            {
                                                                file.name
                                                            }
                                                        </h3>

                                                        {/* BADGES */}
                                                        <div
                                                            className="
                                                                flex items-center
                                                                gap-2

                                                                mt-2

                                                                flex-wrap
                                                            "
                                                        >
                                                            {/* SIZE */}
                                                            <span
                                                                className="
                                                                    text-xs

                                                                    px-2 py-1

                                                                    rounded-full

                                                                    bg-muted
                                                                "
                                                            >
                                                                {
                                                                    file.size_label
                                                                }
                                                            </span>

                                                            {/* EXT */}
                                                            <span
                                                                className="
                                                                    text-xs

                                                                    px-2 py-1

                                                                    rounded-full

                                                                    bg-red-500
                                                                    text-white
                                                                "
                                                            >
                                                                {getFileExtension(
                                                                    file.file_type,
                                                                    file.name
                                                                )}
                                                            </span>
                                                        </div>

                                                        {/* STATUS */}
                                                        {/* <p
                                                            className="
                                                                text-xs
                                                                text-muted-foreground

                                                                mt-3
                                                            "
                                                        >
                                                            {
                                                                file.status_label
                                                            }
                                                        </p> */}

                                                        {/* FOLDER */}
                                                        <div
                                                            className="
                                                                flex items-center
                                                                gap-2

                                                                mt-4

                                                                text-sm
                                                                font-medium
                                                            "
                                                        >
                                                            <Folder className="w-4 h-4" />

                                                            <span className="line-clamp-1">
                                                                {
                                                                    file.folder_name
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                }
                            )}
                        </div>
                    )}
            </section>
        </div>
    )
}