export function detectFileCategory(
    file: File
) {
    const type = file.type

    if (type.startsWith("image/")) {
        return "Images"
    }

    if (type.startsWith("video/")) {
        return "Videos"
    }

    if (
        type.includes("pdf") ||
        type.includes("document") ||
        type.includes("text")
    ) {
        return "Documents"
    }

    if (
        type.includes("zip") ||
        type.includes("rar")
    ) {
        return "Archives"
    }

    return "Others"
}