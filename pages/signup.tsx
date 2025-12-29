/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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

import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../store/index";


import { setDoc, doc } from "firebase/firestore";


import {
  startAddressesRealtime,
  IAddress
} from "../features/addressSlice";

export default function Signup() {
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    city: IAddress | null;
  }>({
    firstName: "",
    lastName: "",
    phone: "",
    city: null,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { addresses } = useSelector((state: RootState) => state.addresses);

  useEffect(() => {
    dispatch(startAddressesRealtime());
  }, [dispatch]);

  const router = useRouter();
  const next = router.query.next as string | undefined;

  const validateForm = (form: any) => {
    const newErrors: { [key: string]: string } = {};

    if (!form.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.city) newErrors.city = "City is required";

    return newErrors;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

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


  //   const handleSignup = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   const validationErrors = validateForm(form);
  //   if (Object.keys(validationErrors).length) {
  //     setErrors(validationErrors);
  //     return;
  //   } else {
  //     setErrors({});
  //   }

  //   try {
  //     // 1️⃣ Create user with email and password
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;

  //     // 2️⃣ Store additional info in Firestore
  //     await setDoc(doc(db, "users", user.uid), {
  //       firstName: form.firstName,
  //       lastName: form.lastName,
  //       phone: form.phone,
  //       city: form.city,
  //       email,
  //       createdAt: new Date(),
  //     });

  //     // 3️⃣ Redirect after signup
  //     router.replace(next || "/checkout");
  //   } catch (err: any) {
  //     const msg = err.message
  //       ?.replace("Firebase: Error (auth/", "")
  //       ?.replace(").", "")
  //       ?.split("-")
  //       ?.join(" ")
  //       ?.toUpperCase();

  //     setError(msg || "SIGNUP FAILED");
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-sm text-gray-600 text-center mb-6">Sign up to continue</p>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* First Name */}
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
            />
            {errors.firstName && <p className="text-red-500 text-md">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />
            {errors.lastName && <p className="text-red-500 text-md">{errors.lastName}</p>}
          </div>

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

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+92 XXX XXXXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            {errors.phone && <p className="text-red-500 text-md">{errors.phone}</p>}
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

          {/* City */}
          <div>
            <Label htmlFor="city">City Address *</Label>
            <Select
              value={form.city?.id || ""}
              onValueChange={(id: string) => {
                const selected = addresses.find((a) => a.id === id) || null;
                setForm((prev) => ({ ...prev, city: selected }));
              }}
            >
              <SelectTrigger id="city" className="w-full">
                <SelectValue placeholder="Select nearest branch" />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((address) => (
                  <SelectItem key={address.id} value={address.id || ""}>
                    {address.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded text-center">{error}</p>
          )}

          {/* Button */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        {/* Login */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?
          <Link
            href="/login"
            className="ml-1 font-semibold text-gray-900 hover:text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
