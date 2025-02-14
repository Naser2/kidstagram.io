
"use client";

import { useState, useEffect } from "react";
import SideNav from "@/components/SideNav";
import  Header   from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<{ user?: any } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session"); // Client-side fetch
        if (response.ok) {
          const sessionData = await response.json();
          setSession(sessionData);
        } else {
          console.error("Failed to fetch session");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-x-hidden relative flex-col md:flex-row md:overflow-hidden !max-w-screen bg-primary">
      <div className="w-20 flex-none lg:w-64 md:border-r sideNavigation">
        <SideNav user={session?.user} />
      </div>
      <div className="flex-grow x19sv2k2  px-4 lg:px-20 mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
         <Header />
        {children}
      </div>
    </div>
  );
}
