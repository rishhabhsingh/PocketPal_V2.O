"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

export default function GoogleAuthButton({ action = "sign-in" }) {
  const handleGoogleAuth = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.log("Error While Google auth", error);
      toast.error("Sign In failed");
    }
  };
  return (
    <>
      <Button
        onClick={handleGoogleAuth}
        variant="outline"
        className="w-full flex items-center gap-2"
      >
        <FaGoogle className="text-xl" />
        {action === "sign-up" ? "Sign Up With Google" : "Sign In With Google"}
      </Button>
    </>
  );
}
