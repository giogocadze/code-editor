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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Sign Up
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
          <SignOutButton>
          <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Sign Out
          </button>
        </SignOutButton> 
      </SignedIn>
    </div>
  );
}
