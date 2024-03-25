"use client";

import { useRouter } from "next/navigation";
import Button from "../button";
import { useEffect } from "react";

const LogoutBtn = () => {
  const router = useRouter();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, []);

  return (
    <Button
      onClick={() => {
        window.localStorage.removeItem("token");
        window.location.assign("/login");
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
