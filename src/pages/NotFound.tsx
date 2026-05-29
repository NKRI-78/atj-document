import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-6">
            <div className="text-center max-w-md">
                <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-10 h-10" />
                </div>

                <h1 className="text-6xl font-bold tracking-tight">404</h1>

                <h2 className="text-2xl font-semibold mt-4">
                    Page Not Found
                </h2>

                <p className="text-muted-foreground mt-3">
                    The page you are looking for does not exist or has been moved.
                </p>

                <div className="mt-8">
                    <Button asChild className="rounded-xl">
                        <Link to="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}