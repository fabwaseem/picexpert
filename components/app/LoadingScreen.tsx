"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { Logo } from "../icons";

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={cn(
        "backdrop-blur-lg absolute bottom-0 left-0 right-0 top-0 z-[999] flex flex-col justify-center items-center w-full  transition-all duration-500",
        isLoading ? "opacity-100 " : "opacity-0 pointer-events-none"
      )}
      style={{ backgroundColor: "rgba(21, 22, 27, .5)" }}
    >
      <Logo size={80} className="animate-pulse" />
      <p>Processing, please wait...</p>
    </div>
  );
};

export default LoadingScreen;
