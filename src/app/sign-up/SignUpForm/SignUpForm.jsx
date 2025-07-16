"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/validations/authSchema";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function MyForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await fetch("api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success("Account Created Successfully");
        form.reset();
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (loginRes?.ok) {
          form.reset();
          router.push("/dashboard");
        } else {
          console.log("Auto Login Failed", loginRes);
          router.push("/login");
        }
      } else {
        const data = await res.json();
        toast.error(data.message || "Sign up failed");
      }
    } catch (error) {
      toast.error("Sign up Failed");
      console.log("SignUp Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md mx-auto py-8 px-2 sm:px-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" type="text" {...field} className="w-full" />
              </FormControl>
              <FormDescription>This is your display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Example@example.com" type="email" {...field} className="w-full" />
              </FormControl>
              <FormDescription>Enter Your Email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Example@123" type="text" {...field} className="w-full" />
              </FormControl>
              <FormDescription>Enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-blue-600 text-white font-bold w-full py-2 rounded-sm hover:bg-blue-400 transition"
          type="submit"
        >
          {loading ? "Signing Up" : "Sign Up"}
        </Button>
        <GoogleAuthButton action = "sign-up"/>
      </form>
    </Form>
  );
}
