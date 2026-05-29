type DownloadFileParams = {
    url: string
    filename?: string
}

export const downloadFile =
    async ({
        url,
        filename,
    }: DownloadFileParams) => {
        try {
            //
            // FETCH FILE
            //
            const response =
                await fetch(url)

            const blob =
                await response.blob()

            //
            // CREATE URL
            //
            const blobUrl =
                window.URL.createObjectURL(
                    blob
                )

            //
            // CREATE LINK
            //
            const link =
                document.createElement(
                    "a"
                )

            link.href = blobUrl

            link.download =
                filename || "file"

            //
            // APPEND
            //
            document.body.appendChild(
                link
            )

            //
            // CLICK
            //
            link.click()

            //
            // REMOVE
            //
            link.remove()

            //
            // CLEANUP
            //
            window.URL.revokeObjectURL(
                blobUrl
            )
        } catch (error) {
            console.error(
                "Download failed",
                error
            )
        }
    }