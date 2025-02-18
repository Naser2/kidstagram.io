"use client"; // This is CRUCIAL - it must be a Client Component

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FollowingWithExtras } from "@/lib/definitions";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { fetchProfile } from "@/lib/data"; // Import fetchProfile

function Dashboard() {
  const params = useParams<{ userId: string }>(); // Get userId from useParams
  const userId = params.userId;
  const pathname = usePathname();
  const router = useRouter();
  const [following, setFollowing] = useState<FollowingWithExtras[] | undefined>(undefined); // State for following data
  const [profile, setProfile] = useState<any>(null);


  useEffect(() => {
    async function fetchData() {
      const fetchedProfile = await fetchProfile(userId);
      setProfile(fetchedProfile);
    }

    fetchData();
  }, [userId]); // Dependency: userId



  useEffect(() => {
    if (profile) {
      setFollowing(profile.following);
    }
  }, [profile]);

  if (!profile) {
    return <div>Loading...</div>; // Or a loading indicator component
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(isOpen) => !isOpen && router.back()}
    >
      <DialogContent className="dialogContent p-6 max-w-[97vw] h-screen">
        <DialogTitle className="hidden">Dashboard Modal</DialogTitle>
        <DialogHeader className="border-b border-zinc-300 dark:border-neutral-700 py-2 w-full">
          <DialogTitle className="mx-auto font-bold text-base p-2">
            Dashboard
          </DialogTitle>
        </DialogHeader>

        {/* You can now use the 'following' data here */}
        {following?.length === 0 && <p className="text-center">Not following any profile.</p>}

      </DialogContent>
    </Dialog>
  );
}

export default Dashboard;