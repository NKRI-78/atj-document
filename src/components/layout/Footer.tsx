import { Copyright } from "lucide-react";

export default function Footer() {
    return (
        <footer
            className="
                border-t
                bg-background
            "
        >
            <div
                className="
                    h-14

                    px-4 md:px-8

                    flex items-center justify-between
                "
            >

                {/* RIGHT */}
                <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Copyright className="h-4 w-4" />
                    <span>{new Date().getFullYear()} Asosiasi Tiger Jakarta</span>
                </div>
            </div>
        </footer>
    )
}