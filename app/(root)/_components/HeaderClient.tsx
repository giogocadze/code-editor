'use client'

import Link from 'next/link'
import { Blocks, Code2, Sparkles } from 'lucide-react'
import { SignedIn } from '@clerk/nextjs'
import ThemeSelector from './ThemeSelector'
import LanguageSelector from './LanguageSelector'
import RunButton from './RunButton'
import HeaderProfileBtn from './HeaderProfileBtn'

type Props = {
  isPro: boolean
}

export default function HeaderClient({ isPro }: Props) {
  return (
    <div className="relative z-10">
      <div className="flex items-center lg:justify-between justify-center 
        bg-[#0a0a0f]/80 backdrop-blur-xl p-6 mb-4 rounded-lg"
      >
        {/* LEFT */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group relative">
            <Blocks className="size-6 text-blue-400" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">CodeEditor</span>
              <span className="text-xs text-blue-400/60">Interactive Code Editor</span>
            </div>
          </Link>

          <nav>
            <Link href="/snippets" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Snippets
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={isPro} />
          </div>

          {!isPro && (
            <Link href="/pricing" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Pro
            </Link>
          )}

          <SignedIn>
            <RunButton />
          </SignedIn>

          <HeaderProfileBtn />
        </div>
      </div>
    </div>
  )
}
