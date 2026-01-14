'use client'
import { useCodeEditorStore } from '@/app/store/useCreateStore'
import Image from "next/image";
import { LANGUAGE_CONFIG } from '../_constants'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from 'lucide-react';

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
                <div
                    className="absolute inset-0 bg-linear -to-r from-blue-500/10 to-purple-500/5 
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                />
                <div className="size-6 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
                    <Image
                        src={currentLanguageObj.logoPath}
                        alt="programming language logo"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain relative z-10"
                    />
                </div>

                <span className="text-gray-200 min-w-20 text-left group-hover:text-white transition-colors">
                    {currentLanguageObj.label}
                </span>

                <ChevronDownIcon
                    className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${isOpen ? "rotate-180" : ""}`}
                />

            </motion.button >
        </div >
    )
}
export default LanguageSelector 