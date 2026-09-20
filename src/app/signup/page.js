"use client";
import { useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = supabaseClient();

  const signup = async () => {
    const response = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(response);
  };

  return (
    <div className="flex gap-5">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={signup}>Sign up</button>
    </div>
  );
};

export default Signup;
