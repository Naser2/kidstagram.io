"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserWithExtras } from "@/lib/definitions";

interface ProfileContextType {
  profile: UserWithExtras | null;
  loading: boolean;
  isProfileOwner: boolean;
  isOwner: (ownerId?: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserWithExtras | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileOwner, setIsProfileOwner] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;
  
    async function fetchProfileData() {
      setLoading(true);
      try {
        
        const res = await fetch(`/api/users/profile/${session?.user.username}`);
        const data = await res.json();
        console.log("Fetched Profile_data:", data),
        console.log("Fetched Profile ID:", data?.id, "Session User ID:", session?.user?.id);
  
        setProfile(data);
        setIsProfileOwner(data?.id === session?.user?.id); // ✅ Ensure IDs match
      } catch (error) {
        console.error("Profile fetch failed", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchProfileData();
  }, [session?.user?.id]); // ✅ Change dependency to `session?.user?.id`
  
  function isOwner(ownerId?: string) {
    return profile?.id === ownerId;
  }
  console.log("ProfileProvider_RESULTS", isProfileOwner);
  return (
    <ProfileContext.Provider value={{ profile, loading, isProfileOwner, isOwner }}>
      {children}
    </ProfileContext.Provider>
  );
}

// ✅ Use profile and ownership check anywhere
export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}


// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { UserWithExtras } from "@/lib/definitions";

// interface ProfileContextType {
//   profile: UserWithExtras | null;
//   loading: boolean;
// }

// const ProfileContext = createContext<ProfileContextType | null>(null);

// export function ProfileProvider({ children }: { children: React.ReactNode }) {
//   const { data: session } = useSession();
//   const [profile, setProfile] = useState<UserWithExtras | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!session?.user?.username) return;
//     async function fetchProfileData() {
//       setLoading(true);
//       if (!session) return;
//       console.log("session", session.user.username);
//       const res = await fetch(`/api/users/profile/${session.user.username}`);
//       const data = await res.json();
//       setProfile(data);
//       setLoading(false);
//     }
//     fetchProfileData();
//   }, [session?.user?.username]);

//   return (
//     <ProfileContext.Provider value={{ profile, loading }}>
//       {children}
//     </ProfileContext.Provider>
//   );
// }

// // ✅ Fix: Ensure `useProfile()` never returns `null`
// export function useProfile() {
//   const context = useContext(ProfileContext);
//   if (!context) {
//     throw new Error("useProfile must be used within a ProfileProvider");
//   }
//   return context;
// }
