"use client";

import { login } from "@frontend/api.service";
import Button from "@frontend/components/button";
import Input from "@frontend/components/input";
import { useState } from "react";

export default function Page() {
  const [user, setUser] = useState("");
  const [passsword, setPass] = useState("");
  const [error, setError] = useState<string | undefined>();

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) window.location.replace("/todos");
  }

  const handleLogin = () => {
    setError(undefined);

    login(user, passsword)
      .then((token) => {
        localStorage.setItem("token", token);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="m-auto mt-48 w-96 text-center ">
      <h2 className="text-2xl">Login</h2>
      <Input
        data-testid="username"
        label="username"
        placeholder="Enter your username..."
        onChange={(e) => setUser(e.target.value)}
      />
      <Input
        data-testid="password"
        type="password"
        label="password"
        placeholder="Enter your password..."
        onChange={(e) => setPass(e.target.value)}
      />
      <Button onClick={() => handleLogin()}>Login</Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
