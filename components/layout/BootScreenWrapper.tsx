"use client";

import { useState, useEffect } from "react";
import { RobcoBootScreen } from "./RobcoBootScreen";

interface BootScreenWrapperProps {
  children: React.ReactNode;
}

export function BootScreenWrapper({ children }: BootScreenWrapperProps) {
  const [bootComplete, setBootComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has seen boot screen in this session
    const hasSeenBoot = sessionStorage.getItem("bootScreenSeen");
    if (hasSeenBoot) {
      setBootComplete(true);
    }
  }, []);

  const handleBootComplete = () => {
    setBootComplete(true);
    sessionStorage.setItem("bootScreenSeen", "true");
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {!bootComplete && <RobcoBootScreen onComplete={handleBootComplete} />}
      {children}
    </>
  );
}
