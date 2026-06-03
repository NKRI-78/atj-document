import { useMemo, useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
    Folder,
    Search,
    Check,
} from "lucide-react"

import { folderStructure } from "./folder-data"

type Props = {
    selectedFolder: string

    onSelect: (
        folder: {
            parent: string
            child: string
        }
    ) => void
}

export default function FolderPickerModal({
    selectedFolder,
    onSelect,
}: Props) {
    const [open, setOpen] =
        useState(false)

    const [search, setSearch] =
        useState("")

    const [tempFolder, setTempFolder] =
        useState<{
            parent: string
            child: string
        } | null>(null)

    //
    // FILTERED DATA
    //
    const filteredFolders = useMemo(() => {
        return folderStructure
            .map((division) => ({
                ...division,

                children:
                    division.children.filter(
                        (folder) =>
                            folder
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                ) ||
                            division.parent
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )
                    ),
            }))
            .filter(
                (division) =>
                    division.children.length > 0
            )
    }, [search])

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            {/* TRIGGER */}
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="
            w-full h-12 rounded-xl
            justify-start
            text-left
          "
                >
                    <Folder className="w-4 h-4 mr-2 shrink-0" />

                    <span className="truncate">
                        {selectedFolder ||
                            "Select Destination Folder"}
                    </span>
                </Button>
            </DialogTrigger>

            {/* MODAL */}
            <DialogContent
                className="
          sm:max-w-5xl
          rounded-3xl
          p-0
          overflow-hidden
        "
            >
                <div className="flex flex-col max-h-[85vh]">
                    {/* HEADER */}
                    <DialogHeader
                        className="
              border-b
              px-6 py-5
            "
                    >
                        <DialogTitle className="text-2xl font-bold">
                            Select Destination Folder
                        </DialogTitle>

                        {/* SEARCH */}
                        <div className="relative mt-4">
                            <Search
                                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  w-4 h-4
                  text-muted-foreground
                "
                            />

                            <Input
                                placeholder="Search folder..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="
                  pl-10
                  h-11
                  rounded-xl
                "
                            />
                        </div>
                    </DialogHeader>

                    {/* CONTENT */}
                    <div
                        className="
              flex-1 overflow-y-auto
              p-6
              bg-muted/20
            "
                    >
                        <div className="space-y-6">
                            {filteredFolders.map(
                                (division) => (
                                    <div
                                        key={
                                            division.parent
                                        }
                                        className="
                      rounded-3xl border
                      bg-background
                      p-6
                    "
                                    >
                                        {/* PARENT */}
                                        <div className="mb-5">
                                            <h3 className="text-lg font-bold">
                                                {
                                                    division.parent
                                                }
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Division Folder
                                            </p>
                                        </div>

                                        {/* CHILDREN */}
                                        <div
                                            className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-4
                      "
                                        >
                                            {division.children.map(
                                                (folder) => {
                                                    const isSelected =
                                                        tempFolder?.parent ===
                                                        division.parent &&
                                                        tempFolder?.child === folder

                                                    return (
                                                        <button
                                                            key={folder}
                                                            type="button"
                                                            onClick={() =>
                                                                setTempFolder({
                                                                    parent:
                                                                        division.parent,

                                                                    child: folder,
                                                                })
                                                            }
                                                            className={`
                                relative rounded-2xl border
                                p-5 text-left
                                transition-all
                                hover:scale-[1.02]
                                ${isSelected
                                                                    ? `
                                      border-primary
                                      bg-primary/10
                                    `
                                                                    : `
                                      hover:bg-muted/50
                                    `
                                                                }
                              `}
                                                        >
                                                            <div className="flex gap-4">
                                                                {/* ICON */}
                                                                <div
                                                                    className="
                                    w-12 h-12 rounded-2xl
                                    bg-primary/10
                                    flex items-center justify-center
                                    shrink-0
                                  "
                                                                >
                                                                    <Folder className="w-5 h-5 text-primary" />
                                                                </div>

                                                                {/* TEXT */}
                                                                <div className="min-w-0">
                                                                    <p className="font-semibold">
                                                                        {folder}
                                                                    </p>

                                                                    <p
                                                                        className="
                                      text-sm text-muted-foreground
                                      truncate mt-1
                                    "
                                                                    >
                                                                        {
                                                                            division.parent
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* CHECK */}
                                                            {isSelected && (
                                                                <div
                                                                    className="
                                    absolute top-4 right-4
                                    w-6 h-6 rounded-full
                                    bg-primary
                                    flex items-center justify-center
                                  "
                                                                >
                                                                    <Check className="w-4 h-4 text-white" />
                                                                </div>
                                                            )}
                                                        </button>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div
                        className="
              border-t
              px-6 py-4
              flex items-center justify-end gap-3
              bg-background
            "
                    >
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                setOpen(false)
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            disabled={!tempFolder}
                            onClick={() => {
                                if (!tempFolder) return

                                onSelect(tempFolder)

                                setOpen(false)
                            }}
                        >
                            Select Folder
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}