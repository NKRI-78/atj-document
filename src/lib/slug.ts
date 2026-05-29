export function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()

        // replace &
        .replace(/&/g, "and")

        // replace spaces
        .replace(/\s+/g, "-")

        // remove special chars
        .replace(/[^\w-]+/g, "")

        // remove double dash
        .replace(/--+/g, "-")
}