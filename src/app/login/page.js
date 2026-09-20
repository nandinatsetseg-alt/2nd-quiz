"use client";
import { useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = supabaseClient();
  const login = async () => {
    const response = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(response);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Enter your details to log in
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <div className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>
      <button
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-[9.8]"
        onClick={login}
      >
        Log in
      </button>
    </div>
  );
};

export default Signup;
