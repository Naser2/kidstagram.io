
"use client";

import { useState, useEffect } from "react";
import SideNav from "@/components/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState(null);
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
    <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
      <div className="w-20 flex-none lg:w-64 md:border-r">
        <SideNav user={session?.user} />
      </div>
      <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import SideNav from "@/components/SideNav";
// import { auth } from "@/auth";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [session, setSession] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const sessionData = await auth(); // Call the server-side auth function
//         setSession(sessionData); // Store the session data in state
//       } catch (error) {
//         console.error("Error fetching session:", error);
//       } finally {
//         setLoading(false); // Mark loading as complete
//       }
//     };

//     fetchSession();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   return (
//     <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
//       <div className="w-20 flex-none lg:w-64 md:border-r">
//         <SideNav user={session?.user} /> {/* Pass the user to SideNav */}
//       </div>
//       <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
//         {children}
//       </div>
//     </div>
//   );
// }


// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [session, setSession] = useState(null);
//   // Fetch user session
//   const session = await auth();
//   const user = session?.user;
//   return (
//     <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
//       <div className="w-20 flex-none lg:w-64 md:border-r">
//         {user && <SideNav user={user} />}
//       </div>
//       <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
//         {children}
//       </div>
//     </div>
//   );
// }
