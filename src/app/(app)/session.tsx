"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";


function Session({ children }: PropsWithChildren) {
  return ( <SessionProvider>{children}</SessionProvider>);
}

export default Session;
