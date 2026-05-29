import axios from "axios"

export const mediaApi =
    axios.create({
        baseURL:
            "https://api-media.langitdigital78.com/api/v1/media",
    })

//
// CREATE FOLDER
//
export const createFolder =
    async (
        folder_name: string,
        parent_folder: string
    ) => {
        const response =
            await mediaApi.post(
                "/folder",
                {
                    folder_name,
                    parent_folder,
                }
            )

        return response.data
    }

//
// UPLOAD FILE
//
export const uploadFile =
    async (
        formData: FormData
    ) => {
        const response =
            await mediaApi.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            )

        return response.data
    }

//
// GET FILES
//
export const getFolderFiles =
    async (
        parentFolder: string,
        folderName: string
    ) => {
        const response =
            await mediaApi.get(
                `/folder/${parentFolder}/${folderName}/files`
            )

        return response.data
    }