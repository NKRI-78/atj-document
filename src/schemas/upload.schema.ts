import { z } from "zod"

export const uploadSchema = z.object({
    nomorSurat: z
        .string()
        .min(1, "Nomor surat wajib diisi"),

    kodeSurat: z
        .string()
        .min(1, "Kode surat wajib diisi"),

    kodeLembaga: z
        .string()
        .min(1, "Kode lembaga wajib diisi"),

    kodeTujuan: z
        .string()
        .min(1, "Kode tujuan wajib diisi"),

    kegiatan: z
        .string()
        .min(1, "Kegiatan wajib diisi"),

    pengesahUtama: z
        .string()
        .min(1, "Pengesah utama wajib diisi"),

    organisasiPenerima: z
        .string()
        .min(1, "Organisasi penerima wajib diisi"),

    category: z
        .string()
        .min(1, "Kategori wajib dipilih"),

    description: z
        .string()
        .min(
            10,
            "Deskripsi minimal 10 karakter"
        ),

    destinationFolder: z
        .string()
        .min(
            1,
            "Folder tujuan wajib dipilih"
        ),

    file: z
        .instanceof(File, {
            message: "File wajib diupload",
        })
        .optional()
        .refine(
            (file) => file !== undefined,
            {
                message: "File wajib diupload",
            }
        ),
})

export type UploadSchemaType =
    z.infer<typeof uploadSchema>