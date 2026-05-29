import {
    FileText,
    Folder,
    ArrowLeft,
    Eye,
    Download,
    FileVideo,
    FileImage,
    FileArchive,
} from "lucide-react"

import {
    useNavigate,
    useParams,
} from "react-router-dom"

import {
    useEffect,
    useState,
} from "react"

import axios from "axios"

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { folderStructure } from "@/components/upload/folder-data"

import { slugify } from "@/lib/slug"
import { downloadFile } from "@/lib/download-file"



type MediaFile = {
    name: string
    file_name: string
    path: string
    size: number
    file_type: string
}

export default function FolderDetailPage() {
    const navigate = useNavigate()

    const { parent, child } =
        useParams()

    //
    // STATE
    //
    const [loading, setLoading] =
        useState(true)

    const [files, setFiles] =
        useState<MediaFile[]>([])

    const [
        previewFile,
        setPreviewFile,
    ] = useState<MediaFile | null>(
        null
    )



    //
    // FIND DATA
    //
    const selectedDivision =
        folderStructure.find(
            (item) =>
                slugify(item.parent) ===
                parent
        )

    const selectedFolder =
        selectedDivision?.children.find(
            (item) =>
                slugify(item) === child
        )



    // =========================
    // FETCH FILES
    // =========================

    useEffect(() => {
        const fetchFiles =
            async () => {
                try {
                    setLoading(true)

                    const response =
                        await axios.get(
                            `https://api-document.asosiasitigerjakarta.com/api/media/folder/${parent}/${child}/files`
                        )

                    setFiles(
                        response.data.data
                            .files
                    )
                } catch (error) {
                    console.error(
                        error
                    )
                } finally {
                    setLoading(false)
                }
            }

        if (parent && child) {
            fetchFiles()
        }
    }, [parent, child])



    //
    // FORMAT SIZE
    //
    const formatFileSize = (
        bytes: number
    ) => {
        if (bytes < 1024)
            return `${bytes} B`

        if (bytes < 1024 * 1024)
            return `${(
                bytes / 1024
            ).toFixed(1)} KB`

        return `${(
            bytes /
            1024 /
            1024
        ).toFixed(1)} MB`
    }



    //
    // FILE TYPE
    //
    const isImage = (
        type: string
    ) =>
        type.startsWith(
            "image/"
        )

    const isVideo = (
        type: string
    ) =>
        type.startsWith(
            "video/"
        )

    const isPdf = (
        type: string
    ) =>
        type.includes("pdf")

    const isExcel = (
        type: string
    ) =>
        type.includes(
            "spreadsheet"
        ) ||
        type.includes("excel") ||
        type.includes(
            "sheet"
        ) ||
        type.includes("xlsx")



    //
    // FILE ICON
    //
    const getFileIcon = (
        type: string
    ) => {
        //
        // IMAGE
        //
        if (isImage(type)) {
            return (
                <FileImage className="w-8 h-8 text-blue-500" />
            )
        }

        //
        // VIDEO
        //
        if (isVideo(type)) {
            return (
                <FileVideo className="w-8 h-8 text-purple-500" />
            )
        }

        //
        // PDF
        //
        if (isPdf(type)) {
            return (
                <FileText className="w-8 h-8 text-red-500" />
            )
        }

        //
        // DEFAULT
        //
        return (
            <FileArchive className="w-8 h-8 text-primary" />
        )
    }



    return (
        <>
            <div className="space-y-6">
                {/* TOP */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-2xl"
                        onClick={() =>
                            navigate("/folders")
                        }
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            {
                                selectedDivision?.parent
                            }
                        </p>

                        <h1
                            className="
                            text-2xl md:text-3xl
                            font-bold
                            tracking-tight
                            mt-1
                        "
                        >
                            {selectedFolder}
                        </h1>
                    </div>
                </div>



                {/* INFO */}
                <div
                    className="
                    flex items-center justify-between
                    flex-wrap gap-4

                    rounded-3xl

                    border
                    bg-muted/30

                    px-5 py-4
                "
                >
                    <div className="flex items-center gap-4">
                        {/* ICON */}
                        <div
                            className="
                            w-14 h-14

                            rounded-2xl

                            bg-black
                            text-white

                            flex items-center justify-center
                        "
                        >
                            <Folder className="w-6 h-6" />
                        </div>

                        {/* TEXT */}
                        <div>
                            <h2
                                className="
                                text-lg
                                font-semibold
                            "
                            >
                                {selectedFolder}
                            </h2>

                            <p
                                className="
                                text-sm
                                text-muted-foreground
                                mt-1
                            "
                            >
                                {files.length} file
                                tersedia
                            </p>
                        </div>
                    </div>
                </div>



                {/* LOADING */}
                {loading && (
                    <div
                        className="
                        grid
                        grid-cols-2
                        lg:grid-cols-3
                        gap-4
                    "
                    >
                        {Array.from({
                            length: 6,
                        }).map((_, i) => (
                            <div
                                key={i}
                                className="
                                rounded-3xl
                                border
                                overflow-hidden
                                animate-pulse
                            "
                            >
                                <div
                                    className="
                                    aspect-square
                                    bg-muted
                                "
                                />

                                <div className="p-4 space-y-3">
                                    <div
                                        className="
                                        h-4
                                        rounded-full
                                        bg-muted
                                    "
                                    />

                                    <div
                                        className="
                                        h-3
                                        w-20
                                        rounded-full
                                        bg-muted
                                    "
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}



                {/* EMPTY */}
                {!loading &&
                    files.length === 0 && (
                        <div
                            className="
                            rounded-3xl

                            border

                            p-10 md:p-14

                            text-center

                            bg-muted/20
                        "
                        >
                            <FileText className="w-12 h-12 mx-auto text-muted-foreground" />

                            <h3
                                className="
                                mt-5
                                text-xl
                                font-semibold
                            "
                            >
                                Belum Ada File
                            </h3>

                            <p
                                className="
                                text-muted-foreground
                                mt-2
                                text-sm
                            "
                            >
                                Tidak ada file di
                                dalam folder ini
                            </p>
                        </div>
                    )}



                {/* FILES */}
                {!loading &&
                    files.length > 0 && (
                        <div
                            className="
        grid

        grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5

        gap-4
    "
                        >
                            {files.map((file) => (
                                <div
                                    key={file.file_name}
                                    onClick={() =>
                                        setPreviewFile(file)
                                    }
                                    className="
                group

                rounded-3xl

                border

                bg-background

                overflow-hidden

                cursor-pointer

                transition-all duration-200

                hover:shadow-xl
                hover:-translate-y-1
            "
                                >
                                    {/* PREVIEW */}
                                    <div
                                        className="
                    relative

                    aspect-[4/3]

                    bg-muted/30

                    overflow-hidden

                    flex items-center justify-center
                "
                                    >
                                        {/* IMAGE */}
                                        {isImage(
                                            file.file_type
                                        ) ? (
                                            <img
                                                src={file.path}
                                                alt={file.file_name}
                                                className="
                            w-full
                            h-full

                            object-cover

                            transition-transform duration-300

                            group-hover:scale-105
                        "
                                            />
                                        ) : (
                                            <div
                                                className="
                            flex flex-col
                            items-center justify-center

                            gap-3
                        "
                                            >
                                                {getFileIcon(
                                                    file.file_type
                                                )}

                                                <p
                                                    className="
                                text-xs
                                text-muted-foreground
                            "
                                                >
                                                    Tidak ada preview
                                                </p>
                                            </div>
                                        )}

                                        {/* OVERLAY */}
                                        <div
                                            className="
                        absolute inset-0

                        bg-black/0

                        transition-all duration-300

                        group-hover:bg-black/10
                    "
                                        />

                                        {/* QUICK ACTION */}
                                        <div
                                            className="
                        absolute
                        top-3
                        right-3

                        opacity-0
                        translate-y-1

                        transition-all duration-200

                        group-hover:opacity-100
                        group-hover:translate-y-0
                    "
                                        >
                                            <Button
                                                size="icon"
                                                className="
                            rounded-xl

                            w-9 h-9

                            bg-white
                            text-black

                            hover:bg-white/90
                        "
                                                onClick={(e) => {
                                                    e.stopPropagation()

                                                    downloadFile({
                                                        url: file.path,

                                                        filename:
                                                            file.file_name
                                                                .split(
                                                                    "/"
                                                                )
                                                                .pop(),
                                                    })
                                                }}
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-4">
                                        {/* NAME */}
                                        <h3
                                            className="
                        font-semibold
                        text-sm

                        line-clamp-1
                    "
                                        >
                                            {file.file_name}
                                        </h3>

                                        {/* TYPE */}
                                        <p
                                            className="
                        text-xs
                        text-muted-foreground

                        mt-1
                    "
                                        >
                                            {file.file_type}
                                        </p>

                                        {/* FOOTER */}
                                        <div
                                            className="
                        flex items-center justify-between

                        mt-4
                        pt-4

                        border-t
                    "
                                        >
                                            {/* SIZE */}
                                            <div>
                                                <p
                                                    className="
                                text-sm
                                font-semibold
                            "
                                                >
                                                    {formatFileSize(
                                                        file.size
                                                    )}
                                                </p>

                                                <p
                                                    className="
                                text-[11px]
                                text-muted-foreground
                            "
                                                >
                                                    Ukuran File
                                                </p>
                                            </div>

                                            {/* OPEN */}
                                            <div
                                                className="
                            text-xs
                            font-medium

                            text-muted-foreground

                            group-hover:text-black

                            transition-colors
                        "
                                            >
                                                Buka
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>



            {/* PREVIEW */}
            {previewFile && (
                <Dialog
                    open={!!previewFile}
                    onOpenChange={() =>
                        setPreviewFile(null)
                    }
                >
                    <DialogContent
                        className="
            !max-w-[98vw]
            w-full

            h-[95vh]

            rounded-3xl

            overflow-hidden

            p-0

            flex flex-col
        "
                    >
                        {/* HEADER */}
                        <div
                            className="
                flex items-center justify-between

                px-6 py-5

                border-b

                shrink-0
            "
                        >
                            <DialogHeader className="space-y-1">
                                <DialogTitle className="text-lg md:text-xl">
                                    {previewFile.file_name}
                                </DialogTitle>

                                <DialogDescription>
                                    {
                                        previewFile.file_type
                                    }
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        {/* CONTENT */}
                        <div
                            className="
                flex-1

                bg-muted/20

                overflow-auto

                p-5
            "
                        >
                            {/* IMAGE */}
                            {isImage(
                                previewFile.file_type
                            ) && (
                                    <div
                                        className="
                        h-full

                        flex items-center justify-center
                    "
                                    >
                                        <img
                                            src={
                                                previewFile.path
                                            }
                                            alt={
                                                previewFile.file_name
                                            }
                                            className="
                            max-w-full
                            max-h-full

                            object-contain

                            rounded-2xl
                        "
                                        />
                                    </div>
                                )}

                            {/* VIDEO */}
                            {isVideo(
                                previewFile.file_type
                            ) && (
                                    <div
                                        className="
                        h-full

                        flex items-center justify-center
                    "
                                    >
                                        <video
                                            controls
                                            className="
                            w-full
                            h-full

                            rounded-2xl

                            bg-black
                        "
                                        >
                                            <source
                                                src={
                                                    previewFile.path
                                                }
                                                type={
                                                    previewFile.file_type
                                                }
                                            />
                                        </video>
                                    </div>
                                )}

                            {/* PDF */}
                            {isPdf(
                                previewFile.file_type
                            ) && (
                                    <iframe
                                        src={
                                            previewFile.path
                                        }
                                        className="
                        w-full
                        h-full

                        rounded-2xl

                        bg-white
                    "
                                    />
                                )}

                            {/* OFFICE */}
                            {isExcel(
                                previewFile.file_type
                            ) && (
                                    <iframe
                                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                                            previewFile.path
                                        )}`}
                                        className="
                        w-full
                        h-full

                        rounded-2xl

                        bg-white
                    "
                                    />
                                )}
                        </div>

                        {/* FOOTER */}
                        <div
                            className="
                flex items-center justify-end
                gap-3

                px-6 py-5

                border-t

                shrink-0
            "
                        >
                            {/* CLOSE */}
                            <Button
                                variant="outline"
                                className="rounded-xl"
                                onClick={() =>
                                    setPreviewFile(
                                        null
                                    )
                                }
                            >
                                Tutup
                            </Button>

                            {/* DOWNLOAD */}
                            <Button
                                className="rounded-xl"
                                onClick={() =>
                                    downloadFile({
                                        url: previewFile.path,

                                        filename:
                                            previewFile.file_name,
                                    })
                                }
                            >
                                <Download className="w-4 h-4 mr-2" />

                                Download
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}