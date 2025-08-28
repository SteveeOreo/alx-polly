// app/auth/register/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      await signUp(email, password);
      router.push("/auth/login"); // Redirect to login page after signup
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Register
        </h1>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <Button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </div>
        <div className="text-center">
          <Link
            href="/auth/login"
            className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
