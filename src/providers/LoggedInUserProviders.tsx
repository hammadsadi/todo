"use client";
import UserProvider from "@/context/UserContext";
import React, { ReactNode, useEffect, useState } from "react";

const LoggedInUserProviders = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null; // or a loader if needed
  return <UserProvider>{children}</UserProvider>;
};

export default LoggedInUserProviders;
