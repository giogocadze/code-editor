'use client'
import { useCodeEditorStore } from '@/app/store/useCreateStore'

import { LANGUAGE_CONFIG } from '../_constants'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {

    const [isOpen, setIsOpen] = useState(false)
    const { language, setLanguage } = useCodeEditorStore()
    const dropDownRef = useRef<HTMLDivElement>(null)
    const currentLanguageObj = LANGUAGE_CONFIG[language]

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        };
        document.addEventListener("mousedown", handleOutsideClick)
        return () => document.addEventListener("mousedown", handleOutsideClick)
    }, [])

    const handleLanguageSelect = (langId: string) => {

    }
    return (
        <div className='relative' ref={dropDownRef} >
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 
      rounded-lg transition-all 
       duration-200 border border-gray-800/50 hover:border-gray-700
       ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}`}
            >

            </motion.button>
        </div>
    )
}
export default LanguageSelector 