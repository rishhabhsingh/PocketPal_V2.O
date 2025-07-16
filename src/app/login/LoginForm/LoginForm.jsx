"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { loginSchema } from "@/lib/validations/authSchema";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function MyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect:false,
        identifier: values.identifier,
        password: values.password,
        callbackUrl: '/'
      });

      if (res.ok) {
        toast.success("Logged in successfully");
        router.push('/dashboard');
      } else {
        toast.error(res.error || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed");
      console.log("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username or Email</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormDescription>Enter your username or email</FormDescription>
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
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormDescription>Enter Your Password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className="bg-blue-600 text-white font-bold px-6 py-2 rounded-sm hover:bg-blue-400 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        <GoogleAuthButton action="login"/>
      </form>
    </Form>
  );
}
