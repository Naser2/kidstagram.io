"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserWithExtras } from "@/lib/definitions";

interface ProfileContextType {
  profile: UserWithExtras | null;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserWithExtras | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.username) return;
    async function fetchProfileData() {
      setLoading(true);
      if (!session) return;
      console.log("session", session.user.username);
      const res = await fetch(`/api/users/profile/${session.user.username}`);
      const data = await res.json();
      setProfile(data);
      setLoading(false);
    }
    fetchProfileData();
  }, [session?.user?.username]);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}

// ✅ Fix: Ensure `useProfile()` never returns `null`
export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
