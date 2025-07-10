'use client'

import "./globals.css";

import nhost from "@/lib/nhost";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { NhostProvider, useAuthenticationStatus } from "@nhost/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import type { NhostClient as NhostApolloClient } from "@nhost/nhost-js";


const Gateway = ({children}: {children: React.ReactNode}) => {

  // Authentication hook
  const {isLoading, isAuthenticated} = useAuthenticationStatus()

  // Hydration hook
  const [hasMounted, setHasMounted] = useState(false)

  // Router
  const router = useRouter()

  // Setting hydration hook to true - indicating project has hydrated before rendering elements
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Redirects to /auth page if page had hydrated, finished loading, but isn't authenticated
  useEffect(() => {
    if (hasMounted && !isLoading && !isAuthenticated) {
      router.replace('/auth')
    }
  }, [isAuthenticated, router, hasMounted, isLoading])


  // Returns this placeholder if app hasn't hydrated yet, nor had finished loading.
  if (!hasMounted || isLoading) {
    return (
          <div>Authenticating...</div>
    )
  }

  // Returns main children of the app otherwise.
  return <>{children}</>
}

const RootLayout = ({children}: {children: React.ReactNode}) => {

  return (
    <html lang="en">
      <body>

        <NhostProvider nhost={nhost}>
          <NhostApolloProvider nhost={nhost as unknown as NhostApolloClient}>
            <Gateway>
              {children}
            </Gateway>
          </NhostApolloProvider>
        </NhostProvider>
      </body>
    </html>
  );
}

export default RootLayout;