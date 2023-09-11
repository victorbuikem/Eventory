"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

function Providers({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
