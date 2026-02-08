export const formatBytesToMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(1)

export const formatSecondsToMMSS = (seconds: number) => {
    const mm = Math.floor(seconds / 60).toString().padStart(2, "0")
    const ss = Math.floor(seconds % 60).toString().padStart(2, "0")
    return `${mm}:${ss}`
}