"use client";
import LoginForm from "./LoginForm/LoginForm.jsx";
import Link from "next/link.js";


export default function LoginPage() {
  return (
    <>
      <header className="w-full flex items-center justify-center px-6 py-4 border-b">
        <h1 className="text-3xl font-bold">AI Finance Analyzer</h1>
      </header>

      <div className="flex justify-center mt-20 px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-300 shadow-lg p-6 bg-white">
          <LoginForm />
          <p>Not have an Account? <Link href='/sign-up' className="text-blue-600 hover: text-blue-700 hover:font-bold transition duration-300 ">Sign Up</Link> </p>
        </div>
      </div>
    </>
  );
}
