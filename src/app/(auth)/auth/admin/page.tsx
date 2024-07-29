"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAdmin } from "@/api/auth";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function AuthPage() {
  const { register, handleSubmit, setError, formState } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await loginAdmin(data.username, data.password);
      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        window.location.href = "/admin";
      }
    } catch (error) {
      setError("username", {
        type: "manual",
        message: "Invalid username or password",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your username and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">username</Label>
              <Input
                {...register("username")}
                id="username"
                type="username"
                placeholder="umar"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                required
              />
            </div>
            {formState.errors.username && (
              <p className="text-red-500 text-sm">
                {(formState.errors?.username?.message as any) ??
                  "Invalid username or password"}
              </p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            Are you a salesman? <Link href="/auth">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
