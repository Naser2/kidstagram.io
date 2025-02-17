"use client"

import { useSession } from "next-auth/react";
import SideNav from "./SideNav";
import Header from "./Header";
import { PostsSkeleton } from "./Skeletons";
import AuthenticationModal from "./authentication/AuthenticationModal";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  console.log("RootLayout", session);
  if (status === "loading") return <PostsSkeleton />
  if (!session?.user) return <AuthenticationModal />
   return  (<div className="flex h-screen overflow-x-hidden relative flex-col md:flex-row md:overflow-hidden !max-w-screen bg-primary">
              <div className="w-20 flex-none lg:w-64 md:border-r sideNavigation">
                <SideNav user={session.user} />
              </div>
              <div className="flex-grow x19sv2k2 sm:px-4 lg:px-14 mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-[97rem] mx-auto">
                <Header  session={session} />
                {children}
              </div>
            </div>
         )
  
}
