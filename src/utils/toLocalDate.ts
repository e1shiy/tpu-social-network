export function toLocalDate(date: Date): string {
    const isYearIncluded = date.getFullYear() !== new Date().getFullYear()
    const options: Intl.DateTimeFormatOptions = {
        year: isYearIncluded ? "numeric" : undefined,
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }
    return date.toLocaleDateString("ru-RU", options)
}