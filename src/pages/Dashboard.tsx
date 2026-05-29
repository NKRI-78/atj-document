import { Card, CardContent } from "@/components/ui/card"
import {
    Folder,
    FileText,
    ImageIcon,
    Video,
} from "lucide-react"

const folders = [
    { name: "Documents", files: 124, icon: FileText },
    { name: "Images", files: 89, icon: ImageIcon },
    { name: "Videos", files: 32, icon: Video },
]

const recentFiles = [
    {
        name: "Company_Profile.pdf",
        size: "2.4 MB",
    },
    {
        name: "UI_Design.fig",
        size: "8.1 MB",
    },
    {
        name: "Marketing_Banner.png",
        size: "1.2 MB",
    },
    {
        name: "Presentation_Q2.pptx",
        size: "4.7 MB",
    },
]

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Heading */}
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-muted-foreground mt-2">
                    Overview of your storage and assets
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {folders.map((folder) => {
                    const Icon = folder.icon

                    return (
                        <Card
                            key={folder.name}
                            className="rounded-3xl hover:shadow-lg transition-all"
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {folder.name}
                                        </p>

                                        <h2 className="text-2xl font-bold mt-1">
                                            {folder.files}
                                        </h2>

                                        <p className="text-xs text-muted-foreground">
                                            Files
                                        </p>
                                    </div>

                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Recent Files */}
            <section>
                <h2 className="text-xl font-semibold mb-5">
                    Recent Files
                </h2>

                <Card className="rounded-3xl overflow-hidden">
                    <CardContent className="p-0">
                        {recentFiles.map((file, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-5 py-5 border-b last:border-none hover:bg-muted/40 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                                        <FileText className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <p className="font-medium break-all">
                                            {file.name}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            Recently updated
                                        </p>
                                    </div>
                                </div>

                                <span className="text-sm text-muted-foreground">
                                    {file.size}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}