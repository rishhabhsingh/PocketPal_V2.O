"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl font-bold cursor-pointer">AI Finance Analyzer</h1>
        </Link>
        {session?.user && (
           <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Dashboard
            </Link>
        )}
      </div>

      {session?.user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-800 font-medium">Hello, {session.user.name}</span>
          <button
            onClick={() => signOut()}
            className="text-red-600 border px-3 py-1 rounded hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="border px-4 py-2 rounded-md hover:bg-blue-100 text-blue-600 text-sm font-medium"
        >
          Log In
        </Link>
      )}
    </header>
  );
}
