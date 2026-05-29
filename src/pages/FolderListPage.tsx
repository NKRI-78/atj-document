import { Folder, ChevronRight } from "lucide-react"

import { folderStructure } from "@/components/upload/folder-data"

import { useNavigate } from "react-router-dom"

import { slugify } from "@/lib/slug"

export default function FolderListPage() {
    const navigate = useNavigate()

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
                    Folder Dokumen
                </h1>

                <p
                    className="
                        text-sm md:text-base
                        text-muted-foreground
                        mt-2
                    "
                >
                    Kelola folder dokumen
                    organisasi dengan mudah
                </p>
            </div>

            {/* LIST */}
            <div className="space-y-6">
                {folderStructure.map(
                    (division) => (
                        <div
                            key={division.parent}
                            className="
                                rounded-3xl

                                border
                                bg-background

                                overflow-hidden

                                shadow-sm
                            "
                        >
                            {/* HEADER */}
                            <div
                                className="
                                    flex items-center
                                    gap-4

                                    px-5 md:px-6
                                    py-5

                                    border-b
                                    bg-muted/30
                                "
                            >
                                {/* ICON */}
                                <div
                                    className="
                                        w-12 h-12

                                        rounded-2xl

                                        bg-black
                                        text-white

                                        flex items-center justify-center

                                        shrink-0
                                    "
                                >
                                    <Folder className="w-5 h-5" />
                                </div>

                                {/* TITLE */}
                                <div>
                                    <h2
                                        className="
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        {division.parent}
                                    </h2>

                                    <p
                                        className="
                                            text-sm
                                            text-muted-foreground
                                            mt-1
                                        "
                                    >
                                        {
                                            division
                                                .children
                                                .length
                                        }{" "}
                                        folder tersedia
                                    </p>
                                </div>
                            </div>

                            {/* FOLDER LIST */}
                            <div className="p-3">
                                <div className="space-y-2">
                                    {division.children.map(
                                        (
                                            folder
                                        ) => (
                                            <button
                                                key={
                                                    folder
                                                }
                                                onClick={() =>
                                                    navigate(
                                                        `/folders/${slugify(
                                                            division.parent
                                                        )}/${slugify(folder)}`
                                                    )
                                                }
                                                className="
                                                    w-full

                                                    flex items-center justify-between

                                                    rounded-2xl

                                                    px-4 py-4

                                                    transition-all duration-200

                                                    hover:bg-muted/50
                                                "
                                            >
                                                {/* LEFT */}
                                                <div className="flex items-center gap-4">
                                                    {/* ICON */}
                                                    <div
                                                        className="
                                                            w-11 h-11

                                                            rounded-xl

                                                            bg-muted

                                                            flex items-center justify-center
                                                        "
                                                    >
                                                        <Folder className="w-5 h-5 text-muted-foreground" />
                                                    </div>

                                                    {/* NAME */}
                                                    <div className="text-left">
                                                        <h3
                                                            className="
                                                                text-sm md:text-base
                                                                font-medium
                                                            "
                                                        >
                                                            {
                                                                folder
                                                            }
                                                        </h3>

                                                        <p
                                                            className="
                                                                text-xs
                                                                text-muted-foreground
                                                                mt-1
                                                            "
                                                        >
                                                            Klik
                                                            untuk
                                                            membuka
                                                            folder
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* RIGHT */}
                                                <ChevronRight
                                                    className="
                                                        w-5 h-5
                                                        text-muted-foreground
                                                    "
                                                />
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}