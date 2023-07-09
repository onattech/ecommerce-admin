import { useState, useEffect } from "react"

export const useOrigin = () => {
    const [mounted, setMounted] = useState(false)
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

    useEffect(() => {
        setMounted(true)
    }, [])

    // This is used to avoid hydration error when ran on server side
    // In another words, checks to see if being ran on server side
    if (!mounted) {
        return ""
    }

    return origin
}
