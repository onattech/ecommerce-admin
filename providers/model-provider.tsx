"use client"

import { useEffect, useState } from "react"

import { StoreModal } from "@/components/modals/store-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // This is used to avoid hydration error when ran on server side
    // In another words, checks to see if being ran on server side
    if (!isMounted) {
        return null
    }

    return (
        <>
            <StoreModal />
        </>
    )
}
