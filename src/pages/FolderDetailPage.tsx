import {
    FileText,
    Folder,
    ArrowLeft,
    Eye,
    Download,
    FileVideo,
    FileImage,
    FileArchive,
    Trash2,
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
import Swal from "sweetalert2"
import { BASE_URL } from "@/utils/constant"

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

type MediaFile = {
    id: number
    name: string
    file_name: string
    path: string
    size: number
    file_type: string
    letter_number: string
    letter_code: string
    institution_code: string
    event: string
    goal_code: string
    main_certifier: string
    recipient_organization: string
    description: string
    category: string
    destination_parent: string
    destination_child: string
    created_at: string
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
                            `${BASE_URL}/api/media/folder/${parent}/${child}/files`
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

    //
    // DELETE FILE
    //
    const handleDeleteFile = async (
        id: number
    ) => {
        const result =
            await Swal.fire({
                icon: "warning",

                title:
                    "Hapus File?",

                text: "File yang dihapus tidak dapat dikembalikan.",

                showCancelButton: true,

                confirmButtonText:
                    "Hapus",

                cancelButtonText:
                    "Batal",

                confirmButtonColor:
                    "#ef4444",
            })

        //
        // CANCEL
        //
        if (!result.isConfirmed)
            return

        try {
            //
            // API
            //
            await axios.delete(
                `${BASE_URL}/api/documents/${id}`
            )

            //
            // REMOVE STATE
            //
            setFiles((prev) =>
                prev.filter(
                    (item) =>
                        item.id !== id
                )
            )

            //
            // CLOSE PREVIEW
            //
            setPreviewFile(null)

            //
            // SUCCESS
            //
            Swal.fire({
                icon: "success",

                title:
                    "Berhasil",

                text: "File berhasil dihapus.",

                timer: 1500,

                showConfirmButton: false,
            })
        } catch (error) {
            console.error(error)

            Swal.fire({
                icon: "error",

                title:
                    "Gagal",

                text: "Terjadi kesalahan saat menghapus file.",
            })
        }
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
                    bg-white

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

                            bg-white
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

        flex items-center
        gap-2
    "
                                        >
                                            {/* DOWNLOAD */}
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
                                                            file.file_name,
                                                    })
                                                }}
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>

                                            {/* DELETE */}
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                className="
            rounded-xl

            w-9 h-9

            bg-white
            text-black

            hover:bg-white/90
        "
                                                onClick={async (e) => {
                                                    e.stopPropagation()

                                                    const result =
                                                        await Swal.fire({
                                                            icon: "warning",

                                                            title:
                                                                "Hapus File?",

                                                            text: "File yang dihapus tidak dapat dikembalikan.",

                                                            showCancelButton: true,

                                                            confirmButtonText:
                                                                "Hapus",

                                                            cancelButtonText:
                                                                "Batal",

                                                            confirmButtonColor:
                                                                "#ef4444",
                                                        })

                                                    //
                                                    // CANCEL
                                                    //
                                                    if (
                                                        !result.isConfirmed
                                                    )
                                                        return

                                                    try {
                                                        //
                                                        // API
                                                        //
                                                        await axios.delete(
                                                            `${BASE_URL}/api/documents/${file.id}`
                                                        )

                                                        //
                                                        // REMOVE
                                                        //
                                                        setFiles(
                                                            (
                                                                prev
                                                            ) =>
                                                                prev.filter(
                                                                    (
                                                                        item
                                                                    ) =>
                                                                        item.id !==
                                                                        file.id
                                                                )
                                                        )

                                                        //
                                                        // SUCCESS
                                                        //
                                                        Swal.fire({
                                                            icon: "success",

                                                            title:
                                                                "Berhasil",

                                                            text: "File berhasil dihapus.",

                                                            timer: 1500,

                                                            showConfirmButton: false,
                                                        })
                                                    } catch (
                                                    error
                                                    ) {
                                                        console.error(
                                                            error
                                                        )

                                                        Swal.fire({
                                                            icon: "error",

                                                            title:
                                                                "Gagal",

                                                            text: "Terjadi kesalahan saat menghapus file.",
                                                        })
                                                    }
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
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
                                            {getFileExtension(
                                                file.file_type,
                                                file.name
                                            )}
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
                                <DialogTitle className="text-lg md:text-xl line-clamp-1">
                                    {
                                        previewFile.file_name
                                    }
                                </DialogTitle>

                                <DialogDescription>
                                    {getFileExtension(
                                        previewFile.file_type,
                                        previewFile.name
                                    )}
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        {/* BODY */}
                        <div
                            className="
                flex-1

                overflow-hidden

                grid
                grid-cols-1
                xl:grid-cols-[320px_1fr]
            "
                        >
                            {/* SIDEBAR DETAIL */}
                            <div
                                className="
                    border-r

                    bg-muted/20

                    overflow-y-auto

                    p-5

                    space-y-6
                "
                            >
                                {/* FILE INFO */}
                                <div className="space-y-4">
                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Nama File
                                        </p>

                                        <p
                                            className="
                                text-sm
                                font-semibold
                                mt-1
                                break-words
                            "
                                        >
                                            {
                                                previewFile.file_name
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Kategori
                                        </p>

                                        <p
                                            className="
                                text-sm
                                font-medium
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.category
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Ukuran File
                                        </p>

                                        <p
                                            className="
                                text-sm
                                font-medium
                                mt-1
                            "
                                        >
                                            {formatFileSize(
                                                previewFile.size
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Folder
                                        </p>

                                        <p
                                            className="
                                text-sm
                                font-medium
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.destination_parent
                                            }
                                        </p>

                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.destination_child
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* SURAT */}
                                <div
                                    className="
                        pt-6
                        border-t

                        space-y-4
                    "
                                >
                                    <h3
                                        className="
                            text-sm
                            font-semibold
                        "
                                    >
                                        Informasi Surat
                                    </h3>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Nomor Surat
                                        </p>

                                        <p
                                            className="
                                text-sm
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.letter_number
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Kode Surat
                                        </p>

                                        <p
                                            className="
                                text-sm
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.letter_code
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Kode Lembaga
                                        </p>

                                        <p
                                            className="
                                text-sm
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.institution_code
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Kode Tujuan
                                        </p>

                                        <p
                                            className="
                                text-sm
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.goal_code
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Kegiatan
                                        </p>

                                        <p
                                            className="
                                text-sm
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.event
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Pengesah Utama
                                        </p>

                                        <p
                                            className="
                                text-sm
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.main_certifier
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Organisasi Penerima
                                        </p>

                                        <p
                                            className="
                                text-sm
                                mt-1
                            "
                                        >
                                            {
                                                previewFile.recipient_organization
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className="
                                text-xs
                                text-muted-foreground
                            "
                                        >
                                            Deskripsi
                                        </p>

                                        <p
                                            className="
                                text-sm
                                mt-1
                                leading-relaxed
                            "
                                        >
                                            {
                                                previewFile.description
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* PREVIEW */}
                            <div
                                className="
                    bg-white

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

                            {/* DELETE */}
                            <Button
                                variant="destructive"
                                className="rounded-xl"
                                onClick={async () => {
                                    //
                                    // CLOSE DIALOG
                                    //
                                    setPreviewFile(null)

                                    //
                                    // WAIT DIALOG CLOSE
                                    //
                                    await new Promise(
                                        (resolve) =>
                                            setTimeout(
                                                resolve,
                                                200
                                            )
                                    )

                                    //
                                    // DELETE
                                    //
                                    handleDeleteFile(
                                        previewFile.id
                                    )
                                }}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />

                                Hapus
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