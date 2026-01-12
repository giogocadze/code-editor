// components/AuthButtons.tsx
"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton>
          <button className="bg-[#6c47ff] text-white rounded-full px-4 h-10">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        {/* Option A: User avatar dropdown (recommended) */}
        <UserButton />

        {/* Option B: Explicit Sign Out button (optional) */}
        {/* 
        <SignOutButton>
          <button className="text-sm text-gray-600 hover:text-black">
            Sign Out
          </button>
        </SignOutButton> 
        */}
      </SignedIn>
    </div>
  );
}
