import { useRef, useState } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import {
    Upload,
    FileText,
    X,
} from "lucide-react"

import {
    uploadSchema,
    type UploadSchemaType,
} from "@/schemas/upload.schema"

import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import FolderPickerModal from "@/components/upload/FolderPickerModal"
import { slugify } from "@/lib/slug"
import Swal from "sweetalert2"
import { api } from "@/services/api"

export default function UploadForm() {
    const [selectedFile, setSelectedFile] =
        useState<File | null>(null)

    const [
        selectedFolder,
        setSelectedFolder,
    ] = useState<{
        parent: string
        child: string
    } | null>(null)


    const [loading, setLoading] =
        useState(false)

    const [category, setCategory] =
        useState("")

    const fileInputRef =
        useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {
            errors,
        },
    } = useForm<UploadSchemaType>({
        resolver:
            zodResolver(
                uploadSchema
            ),

        mode: "onChange",

        defaultValues: {
            nomorSurat: "",
            kodeSurat: "",
            kodeLembaga: "",
            kodeTujuan: "",
            kegiatan: "",
            pengesahUtama: "",
            organisasiPenerima: "",
            category: "",
            description: "",
            destinationFolder: "",
            file: undefined,
        },
    })

    //
    // FILE ACCEPT
    //
    const getAcceptedFileTypes = () => {
        switch (category) {
            case "Documents":
                return `
                .pdf,
                .doc,
                .docx,
                .xls,
                .xlsx,
                .ppt,
                .pptx
            `

            case "Images":
                return `
                image/png,
                image/jpeg,
                image/jpg,
                image/webp
            `

            case "Videos":
                return `
                video/mp4,
                video/webm,
                video/quicktime
            `

            default:
                return "*"
        }
    }

    //
    // SUBMIT
    //
    const onSubmit = async (
        data: UploadSchemaType
    ) => {
        try {
            //
            // VALIDATION
            //
            if (
                !selectedFolder ||
                !data.file
            ) {
                return
            }

            //
            // LOADING
            //
            setLoading(true)

            //
            // SLUGIFY
            //
            const parent_folder =
                slugify(
                    selectedFolder.parent
                )

            const folder_name =
                slugify(
                    selectedFolder.child
                )

            //
            // =========================
            // STEP 1
            // UPLOAD MEDIA
            // =========================
            //
            const mediaFormData =
                new FormData()

            mediaFormData.append(
                "media",
                data.file
            )

            mediaFormData.append(
                "media[parent_folder]",
                parent_folder
            )

            mediaFormData.append(
                "media[folder_name]",
                folder_name
            )

            //
            // MEDIA API
            //
            const mediaResponse =
                await api.post(
                    "/api/media/upload",
                    mediaFormData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                )

            //
            // MEDIA RESULT
            //
            const uploadedMedia =
                mediaResponse.data.data

            console.log(
                "MEDIA RESPONSE",
                uploadedMedia
            )

            //
            // =========================
            // STEP 2
            // CREATE DOCUMENT
            // =========================
            //
            const payload = {
                nomorSurat:
                    data.nomorSurat,

                kodeSurat:
                    data.kodeSurat,

                kodeLembaga:
                    data.kodeLembaga,

                kodeTujuan:
                    data.kodeTujuan,

                kegiatan:
                    data.kegiatan,

                pengesahUtama:
                    data.pengesahUtama,

                organisasiPenerima:
                    data.organisasiPenerima,

                category:
                    data.category,

                description:
                    data.description,

                //
                // DISPLAY
                //
                destinationFolder: {
                    parent:
                        selectedFolder.parent,

                    child:
                        selectedFolder.child,
                },

                //
                // MEDIA FOLDER
                //
                media: {
                    parent_folder,
                    folder_name,
                },

                //
                // FILE INFO
                //
                file: {
                    name:
                        uploadedMedia.name,

                    size:
                        uploadedMedia.size,

                    type:
                        uploadedMedia.mimetype,

                    path:
                        uploadedMedia.path,

                    gcs_path:
                        uploadedMedia.gcs_path,
                },
            }

            //
            // DEBUG
            //
            console.log(
                "FINAL PAYLOAD",
                payload
            )

            //
            // CREATE DOCUMENT
            //
            const documentResponse =
                await api.post(
                    "/api/documents",
                    payload,
                    {
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                    }
                )

            console.log(
                "DOCUMENT RESPONSE",
                documentResponse.data
            )

            //
            // SUCCESS
            //
            Swal.fire({
                icon: "success",

                title:
                    "Upload Success",

                text: "Document uploaded successfully",
            })

            //
            // RESET FORM
            //
            reset()

            //
            // RESET STATES
            //
            setCategory("")

            setSelectedFile(null)

            setSelectedFolder(null)

            //
            // RESET FILE INPUT
            //
            if (fileInputRef.current) {
                fileInputRef.current.value =
                    ""
            }
        } catch (error) {
            console.error(error)

            Swal.fire({
                icon: "error",

                title:
                    "Upload Failed",

                text: "Something went wrong",
            })
        } finally {
            //
            // STOP LOADING
            //
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full">
            <Card
                className="
            w-full
            min-h-screen
            rounded-none xl:rounded-[2rem]
            border-0
            shadow-none xl:shadow-xl
            overflow-hidden
        "
            >
                <CardContent className="p-0 h-full">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="
                    grid
                    grid-cols-1
                    xl:grid-cols-2
                    min-h-screen
                "
                    >
                        {/* LEFT SECTION */}
                        <div
                            className="
                        p-6 md:p-8 xl:p-10
                        bg-background
                        flex flex-col
                    "
                        >
                            {/* HEADER */}
                            <div className="mb-10">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Upload Dokumen
                                </h1>

                                <p className="text-muted-foreground mt-3">
                                    Lengkapi informasi dokumen dan unggah file ke sistem arsip organisasi.
                                </p>
                            </div>

                            {/* FORM */}
                            <div
                                className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-6
                        "
                            >
                                {/* NOMOR SURAT */}
                                <div className="space-y-2">
                                    <Label>
                                        Nomor Surat
                                    </Label>

                                    <Input
                                        placeholder="Masukkan nomor surat"
                                        className="h-12 rounded-2xl"
                                        {...register(
                                            "nomorSurat"
                                        )}
                                    />

                                    {errors.nomorSurat && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .nomorSurat
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* KODE SURAT */}
                                <div className="space-y-2">
                                    <Label>
                                        Kode Surat
                                    </Label>

                                    <Input
                                        placeholder="Masukkan kode surat"
                                        className="h-12 rounded-2xl"
                                        {...register(
                                            "kodeSurat"
                                        )}
                                    />

                                    {errors.kodeSurat && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .kodeSurat
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* KODE LEMBAGA */}
                                <div className="space-y-2">
                                    <Label>
                                        Kode Lembaga
                                    </Label>

                                    <Input
                                        placeholder="Masukkan kode lembaga"
                                        className="h-12 rounded-2xl"
                                        {...register(
                                            "kodeLembaga"
                                        )}
                                    />

                                    {errors.kodeLembaga && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .kodeLembaga
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* KODE TUJUAN */}
                                <div className="space-y-2">
                                    <Label>
                                        Kode Tujuan
                                    </Label>

                                    <Input
                                        placeholder="Masukkan kode tujuan"
                                        className="h-12 rounded-2xl"
                                        {...register(
                                            "kodeTujuan"
                                        )}
                                    />

                                    {errors.kodeTujuan && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .kodeTujuan
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* KEGIATAN */}
                                <div className="space-y-2">
                                    <Label>
                                        Kegiatan
                                    </Label>

                                    <Input
                                        placeholder="Masukkan nama kegiatan"
                                        className="h-12 rounded-2xl"
                                        {...register(
                                            "kegiatan"
                                        )}
                                    />

                                    {errors.kegiatan && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .kegiatan
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* PENGESAH */}
                                <div className="space-y-2">
                                    <Label>
                                        Pengesah Utama
                                    </Label>

                                    <Input
                                        placeholder="Masukkan nama pengesah"
                                        className="h-12 rounded-2xl"
                                        {...register(
                                            "pengesahUtama"
                                        )}
                                    />

                                    {errors.pengesahUtama && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .pengesahUtama
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* ORGANISASI */}
                                <div className="space-y-2">
                                    <Label>
                                        Organisasi Penerima
                                    </Label>

                                    <Input
                                        placeholder="Masukkan organisasi penerima"
                                        className="h-12 rounded-2xl"
                                        {...register(
                                            "organisasiPenerima"
                                        )}
                                    />

                                    {errors.organisasiPenerima && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .organisasiPenerima
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* CATEGORY */}
                                <div className="space-y-2">
                                    <Label>
                                        Category
                                    </Label>

                                    <select
                                        className="
                                    w-full
                                    h-12
                                    rounded-2xl
                                    border
                                    bg-background
                                    px-4
                                    border-muted
                                    outline-none
                                "
                                        value={category}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value

                                            setCategory(value)

                                            setValue(
                                                "category",
                                                value,
                                                {
                                                    shouldValidate: true,
                                                }
                                            )

                                            //
                                            // RESET FILE
                                            //
                                            setSelectedFile(
                                                null
                                            )

                                            setValue(
                                                "file",
                                                undefined,
                                                {
                                                    shouldValidate: true,
                                                }
                                            )

                                            //
                                            // RESET INPUT
                                            //
                                            if (
                                                fileInputRef.current
                                            ) {
                                                fileInputRef.current.value =
                                                    ""
                                            }
                                        }}
                                    >
                                        <option value="">
                                            Select category
                                        </option>

                                        <option value="Documents">
                                            Documents
                                        </option>

                                        <option value="Images">
                                            Images
                                        </option>

                                        <option value="Videos">
                                            Videos
                                        </option>
                                    </select>

                                    {errors.category && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .category
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* DESCRIPTION */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label>
                                        Deskripsi Document
                                    </Label>

                                    <Textarea
                                        placeholder="Masukkan deskripsi dokumen"
                                        className="
                                    min-h-40
                                    rounded-2xl
                                "
                                        {...register(
                                            "description"
                                        )}
                                    />

                                    {errors.description && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .description
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* DESTINATION */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label>
                                        Destination Folder
                                    </Label>

                                    <FolderPickerModal
                                        selectedFolder={
                                            selectedFolder
                                                ? `${selectedFolder.parent} / ${selectedFolder.child}`
                                                : ""
                                        }
                                        onSelect={(folder) => {
                                            setSelectedFolder({
                                                parent: folder.parent,
                                                child: folder.child,
                                            })

                                            setValue(
                                                "destinationFolder",
                                                `${folder.parent}/${folder.child}`,
                                                {
                                                    shouldValidate: true,
                                                }
                                            )
                                        }}
                                    />

                                    {errors.destinationFolder && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors
                                                    .destinationFolder
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SECTION */}
                        <div
                            className="
                        border-t xl:border-t-0
                        xl:border-l
                        bg-muted/30
                        p-6 md:p-8 xl:p-10
                        flex flex-col
                    "
                        >
                            {/* UPLOAD AREA */}
                            <div
                                onClick={() => {
                                    //
                                    // MUST SELECT CATEGORY
                                    //
                                    if (!category) {
                                        Swal.fire({
                                            icon: "warning",

                                            title: "Pilih Kategori",

                                            text: "Silakan pilih kategori terlebih dahulu sebelum mengupload file.",
                                        })

                                        return
                                    }

                                    fileInputRef.current?.click()
                                }}
                                className={`
                                    flex-1
                                    min-h-100
                                    flex flex-col
                                    items-center justify-center
                                    border-2 border-dashed
                                    mb-3
                                    rounded-[2rem]
                                    bg-background
                                    p-8
                                    ${!category
                                        ? "cursor-not-allowed opacity-60"
                                        : "cursor-pointer hover:bg-muted/20"}
                                    transition-all
                                `}
                            >
                                {/* INPUT */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept={getAcceptedFileTypes()}
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0]

                                        if (file) {
                                            setSelectedFile(
                                                file
                                            )

                                            setValue(
                                                "file",
                                                file,
                                                {
                                                    shouldValidate: true,
                                                }
                                            )
                                        }
                                    }}
                                />

                                {!selectedFile ? (
                                    <>
                                        {/* ICON */}
                                        <div
                                            className="
                                        w-28 h-28 rounded-full
                                        bg-primary/10
                                        flex items-center justify-center
                                        mb-6
                                    "
                                        >
                                            <Upload className="w-14 h-14 text-primary" />
                                        </div>

                                        <h3 className="text-2xl font-bold">
                                            Upload File
                                        </h3>

                                        <p className="text-muted-foreground mt-3 text-center">
                                            Click to browse your
                                            document
                                        </p>

                                        {category && (
                                            <div
                                                className="
                                            mt-6
                                            px-4 py-2
                                            rounded-full
                                            bg-primary/10
                                            text-primary
                                            text-sm font-medium
                                        "
                                            >
                                                {category}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div
                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }
                                        className="
                                    w-full
                                    rounded-[2rem]
                                    border
                                    bg-background
                                    p-6
                                    shadow-lg
                                "
                                    >
                                        <div className="flex items-start gap-5">
                                            {/* ICON */}
                                            <div
                                                className="
                                            w-16 h-16 rounded-3xl
                                            bg-primary/10
                                            flex items-center justify-center
                                        "
                                            >
                                                <FileText className="w-8 h-8 text-primary" />
                                            </div>

                                            {/* FILE INFO */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold truncate">
                                                    {
                                                        selectedFile.name
                                                    }
                                                </p>

                                                <p className="text-sm text-muted-foreground mt-2">
                                                    {(
                                                        selectedFile.size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(
                                                        2
                                                    )}{" "}
                                                    MB
                                                </p>

                                                <div
                                                    className="
                                                mt-4 inline-flex
                                                px-3 py-1 rounded-full
                                                bg-primary/10
                                                text-primary
                                                text-xs font-medium
                                            "
                                                >
                                                    {category}
                                                </div>
                                            </div>

                                            {/* REMOVE */}
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={(e) => {
                                                    e.stopPropagation()

                                                    setSelectedFile(
                                                        null
                                                    )

                                                    setValue(
                                                        "file",
                                                        undefined,
                                                        {
                                                            shouldValidate: true,
                                                        }
                                                    )

                                                    if (
                                                        fileInputRef.current
                                                    ) {
                                                        fileInputRef.current.value =
                                                            ""
                                                    }
                                                }}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* SUBMIT */}
                            <Button
                                type="submit"
                                className="
                                    w-full h-14
                                    rounded-2xl
                                    text-base font-semibold
                                "
                                disabled={loading}
                            >
                                {loading
                                    ? "Uploading..."
                                    : "Simpan Dokumen"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}