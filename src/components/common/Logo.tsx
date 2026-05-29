import clsx from "clsx"
import logo from "@/assets/logo.png"

type LogoProps = {
    size?: number
    showText?: boolean
    className?: string
}

export default function Logo({
    size = 50,
    className,
}: LogoProps) {
    return (
        <div
            className={clsx(
                "flex items-center gap-3",
                className
            )}
        >
            {/* IMAGE */}
            <div
                className="
                    rounded-2xl
                    overflow-hidden
                    shadow-lg
                    border border-white/10
                    bg-white/10
                    backdrop-blur
                    flex items-center justify-center
                "
                style={{
                    width: size,
                    height: size,
                }}
            >
                <img
                    src={logo}
                    alt="ATJ Logo"
                    className="
                        w-full
                        h-full
                        object-cover
                    "
                />
            </div>
        </div>
    )
}