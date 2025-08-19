export function LoadingDots() {
    return (
        <div className="flex items-center justify-center space-x-2">
            <span className="w-3 h-3 dark:bg-white bg-zinc-600 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 dark:bg-white bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
            <span className="w-3 h-3 dark:bg-white bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
        </div>
    )
}