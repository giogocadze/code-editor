"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { useState } from "react"
import NavigationHeader from "../components/NavigationHeader/NavigationHeader"
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton"

const page = () => {

    const snippets = useQuery(api.snippets.getSnippets)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [view, setView] = useState<"grid" | "list">("grid");

    if (snippets === undefined) {
        return (
            <div className="min-h-screen" >
                <NavigationHeader />
                <SnippetsPageSkeleton />
            </div>
        )
    }
    return (
        <div>
            snippets page
        </div>
    )
}

export default page
