"use client"

import { useSession } from "next-auth/react";
import SideNav from "./SideNav";
import Header from "./Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>; // Prevent UI flickering

  if (!session?.user) return null; // No user? No UI.
  return (

    <div className="flex h-screen overflow-x-hidden relative flex-col md:flex-row md:overflow-hidden !max-w-screen bg-primary">
      <div className="w-20 flex-none lg:w-64 md:border-r sideNavigation">
        <SideNav user={session.user} />
      </div>
      <div className="flex-grow x19sv2k2 sm:px-4 lg:px-20 mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
        <Header  session={session} />
        {children}
      </div>
    </div>
  );
}
