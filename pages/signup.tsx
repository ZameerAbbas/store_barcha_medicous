/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import Link from "next/link";

import { Input } from "../component/ui/input";
import { Button } from "../component/ui/button";
import { Label } from "../component/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../component/ui/select";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dress, setDress] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const next = router.query.next as string | undefined;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!dress) {
      setError("PLEASE SELECT A DRESS");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // 🔥 Later you can store dress in Firestore
      // await setDoc(doc(db, "users", user.uid), { dress })

      router.replace(next || "/checkout");
    } catch (err: any) {
      const msg = err.message
        ?.replace("Firebase: Error (auth/", "")
        ?.replace(").", "")
        ?.split("-")
        ?.join(" ")
        ?.toUpperCase();

      setError(msg || "SIGNUP FAILED");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Sign up to continue
        </p>

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>

          {/* Dress Select */}
          <div>
            <Label>Select Dress</Label>
            <Select onValueChange={setDress}>
              <SelectTrigger>
                <SelectValue placeholder="Choose dress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abaya">Abaya</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="saree">Saree</SelectItem>
                <SelectItem value="western">Western</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        {/* Login */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?
          <Link href="/login" className="ml-1 font-semibold text-black">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
