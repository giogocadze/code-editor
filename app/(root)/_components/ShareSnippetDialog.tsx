import { useCodeEditorStore } from '@/app/store/useCreateStore'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import React, { useState } from 'react'

function ShareSnippetDialog({ onClose }: {onClose: () => void }) {

    const [title, setTitle] = useState("")
    const [isSharing, setIsSharing] = useState(false)
    const { language, getCode } = useCodeEditorStore()
    const createSnippet = useMutation(api.snippets.createSnippet)

    const handleShare = async () => {}
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            shareSnippetDialog
        </div>
    )
}

export default ShareSnippetDialog
