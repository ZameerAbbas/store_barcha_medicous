/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import Link from "next/link";

const BmcLogo = () => (
  <div className="flex items-center space-x-2">
    <span className="text-xl font-bold text-green-600">BMC</span>
    <span className="text-sm text-gray-700">
      Barcha Medical Store
    </span>
  </div>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const next = router.query.next as string | undefined;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.replace(next || "/checkout");
    } catch (err: any) {
      const errorMessage = err.message
        ?.replace("Firebase: Error (auth/", "")
        ?.replace(").", "")
        ?.split("-")
        ?.join(" ")
        ?.toUpperCase();

      setError(errorMessage || "LOGIN FAILED");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">

      {/* Logo */}
      <div className="absolute top-6 left-6">
        <BmcLogo />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Login to Barcha Medical Store
          </h1>
          <p className="text-sm text-gray-600">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email or Phone
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-gray-600 hover:text-blue-600"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-md font-semibold hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?
          <Link
            href="/signup"
            className="ml-1 font-semibold text-gray-900 hover:text-blue-600"
          >
            Sign Up
          </Link>
        </div>
      </div>

      
    </div>
  );
}
