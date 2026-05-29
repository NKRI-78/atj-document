import {
    Heart,
    ShieldCheck,
} from "lucide-react"
import Logo from "../common/Logo"

export default function Footer() {
    return (
        <footer
            className="
                border-t

                bg-background/80
                backdrop-blur-xl
            "
        >
            <div
                className="
                    px-4 md:px-8

                    py-5

                    flex flex-col md:flex-row
                    items-center justify-between

                    gap-4
                "
            >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                </div>
                {/* RIGHT */}
                <div
                    className="
                        flex items-center gap-1

                        text-xs
                        text-muted-foreground
                    "
                >
                    ATJ Document
                </div>
            </div>
        </footer>
    )
}