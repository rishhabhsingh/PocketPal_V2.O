"use client";

import Link from "next/link.js";
import SignUpForm from "./SignUpForm/SignUpForm.jsx";

export default function SignUpPage() {
  return (
    <>
      <header className="w-full flex items-center justify-center px-6 py-4 border-b">
             <h1 className="text-3xl font-bold">AI Finance Analyzer</h1>
           </header>
     
           <div className="flex justify-center mt-12 px-4">
             <div className="w-full max-w-md rounded-xl border border-gray-300 shadow-lg p-6 bg-white">
               <SignUpForm/>
               <p>Already Have a Account? <Link href='/login' className="text-blue-600 hover: text-blue-700 hover:font-bold transition duration-300 ">Sign In</Link> </p>
             </div>
           </div>
    </>
  );
}
