"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <header className="w-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-b gap-2 sm:gap-0">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 w-full sm:w-auto">
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl font-bold cursor-pointer text-center sm:text-left">AI Finance Analyzer</h1>
        </Link>
        {session?.user && (
           <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold shadow-sm border border-black hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              style={{ minHeight: '2.25rem' }}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
        )}
      </div>
      {session?.user ? (
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
          <span className="text-gray-800 font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">Hello, {session.user.name}</span>
          <button
            onClick={() => signOut()}
            className="text-red-600 border px-3 py-1 rounded hover:bg-red-100 text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="border px-4 py-2 rounded-md hover:bg-blue-100 text-blue-600 text-sm font-medium w-full sm:w-auto text-center"
        >
          Log In
        </Link>
      )}
    </header>
  );
}
