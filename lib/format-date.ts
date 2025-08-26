export function formatDate(dateString? : string): string {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
}

export function formatDateName(dateString? : string): string {

    if(dateString){
        const dateObj = new Date(dateString)
        const formatted = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(dateObj)
        return formatted
    }
    return "Present"
}
