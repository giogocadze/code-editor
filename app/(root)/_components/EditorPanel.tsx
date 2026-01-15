"use client"
import { useCodeEditorStore } from '@/app/store/useCreateStore'
import { useEffect, useState } from 'react'
import { LANGUAGE_CONFIG } from '../_constants'

const EditorPanel = () => {

  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const { language, theme, fontSize, editor, setEditor, setFontSize } = useCodeEditorStore()

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code${language}`)
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode
    if (editor) editor.setValue(newCode)
  }, [language, editor])
  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size")
    if (savedFontSize) setFontSize(parseInt(savedFontSize))
  })

  const handleRefresh = () => { }
  const handleEditorChange = () => { }
  const handleFontSizeChange = () => {}
  return (
    <div className='relative' >
      Editor Panel
    </div>
  )
}

export default EditorPanel
