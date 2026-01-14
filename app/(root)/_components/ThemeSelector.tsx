"use client"
import { useCodeEditorStore } from '@/app/store/useCreateStore'
import React, { useEffect, useRef, useState } from 'react'
import { THEMES } from '../_constants'
import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'

const ThemeSelector = () => {


    const [isopen, setIsOpen] = useState(false)
    const { theme, setTheme } = useCodeEditorStore()
    const dropDownRef = useRef<HTMLDivElement>(null)
    const currentTheme = THEMES.find((t) => t.id === theme)

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        };
        document.addEventListener("mousedown", handleOutsideClick)
        return () => document.addEventListener("mousedown", handleOutsideClick)
    }, [])


    return (
        <div className='relative' ref={dropDownRef} >
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isopen)}
                className="w-42 group relative flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2e]/80 hover:bg-[#262637] 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700"
            >
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 
                rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <Palette className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                <span className="text-gray-300 min-w-20 text-left group-hover:text-white transition-colors">
                    {currentTheme?.label}
                </span>
                
                <div
                    className="relative w-4 h-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
                    style={{ background: currentTheme?.color }}
                />
            </motion.button>
        </div>
    )
}

export default ThemeSelector
