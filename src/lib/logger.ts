const isDev = import.meta.env.DEV

type LogType =
    | "log"
    | "error"
    | "warn"
    | "info"

const print = (
    type: LogType,
    message: string,
    data?: unknown
) => {
    // production jangan tampil
    if (!isDev) return

    const styles = {
        log: "color: #3b82f6; font-weight: bold",
        error: "color: #ef4444; font-weight: bold",
        warn: "color: #f59e0b; font-weight: bold",
        info: "color: #10b981; font-weight: bold",
    }

    console[type](
        `%c[ATJ ${type.toUpperCase()}]`,
        styles[type],
        message,
        data ?? ""
    )
}

export const logger = {
    log: (message: string, data?: unknown) =>
        print("log", message, data),

    error: (message: string, data?: unknown) =>
        print("error", message, data),

    warn: (message: string, data?: unknown) =>
        print("warn", message, data),

    info: (message: string, data?: unknown) =>
        print("info", message, data),
}